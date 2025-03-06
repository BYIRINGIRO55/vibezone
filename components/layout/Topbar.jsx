"use client"
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'
import { Logout } from '@mui/icons-material'
import Image from 'next/image'
import { Add, Search } from '@node_modules/@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Topbar = () => {

  const router = useRouter();

  const [search, setSearch] = useState("");

  return (
    <div className='flex justify-between items-center mt-6'>
      <div className='relative'>
        <input
          type="text"
          className='search-bar'
          placeholder='Search posts, people, ...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className='search-icon' onClick={() => { }} />
      </div>

      <button
        className='create-post-btn'
        onClick={() => router.push("/create-post")}
      >
        <Add /><p>Create A Post</p>
      </button>

      <div className='flex gap-3'>
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer md:hidden items-center">
              <Logout sx={{ color: "white", fontSize: "32px" }} />
            </div>
          </SignOutButton>
        </SignedIn>
        <Link href="/">
          <Image
            src="/assets/phucmai.png"
            alt="profile pic" width={50} height={50}
            className="rounded-full md:hidden"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar
