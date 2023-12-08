'use client'
import React from "react"
import Image from "next/image"
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

import './style.css'
const Header = () => {
  const session = useSession();
  return (
    <div className="navbar">
        <Link href="/" className='navbar__logo'>X</Link>
        <div className='navbar__links'>
            <Link href="/blog" className="navbar__blog navbar-link"> Blogs </Link>
            <Link href="/dashboard" className="navbar__dashboard navbar-link"> Dashboard</Link>
            <Link href="/short" className="navbar__portfolio navbar-link"> Shorts</Link>
            <Link href="/about" className="navbar__about navbar-link"> About</Link>
            <Link href="/contact" className="navbar-link"> Contact</Link>
            {session.status === 'authenticated' &&  <button onClick={()=>signOut()} className='navbar__links-btn'>Sign Out</button>}
        </div>
    </div>
  )
}

export default Header
