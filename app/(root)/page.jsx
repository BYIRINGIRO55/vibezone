import { UserButton } from "@clerk/nextjs"

export default function (){
  return (
    <div className="h-screen">
        <UserButton afterSwitchSessionUrl="/"/>
    </div>
  )
}

