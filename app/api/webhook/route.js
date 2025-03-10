import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createOrUpdateUser, deleteUser } from '@lib/actions/user'

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Error: Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env')
    }

   

    // Get headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        })
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    const eventType = evt?.type

    if (eventType === 'user.created' || 'user.updated') {
        const { id, first_name, last_name, image_url, email_addresses, username } = evt?.type;

        try {
            await createOrUpdateUser(id, first_name, last_name, image_url, email_addresses, username)

            return new Response('User is created', {
                status: 200
            })
        } catch (err) {
            console.error("Error creating or updating user:", err);
            return new Response('Error occured', {
                status: 500
            });
        }
    }

    if(eventType === "user.deleted"){

        try {
            const {id} = evt?.data;
            await deleteUser(id)
            return new Response('User is deleted', {
                status: 200,
            })
        } catch (error) {
            console.error("Error deleting User ");
            return new Response('Error occured', {
                status: 500
            });
        }
    }
}