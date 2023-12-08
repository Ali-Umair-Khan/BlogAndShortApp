'use client'
import { signIn,useSession } from "next-auth/react";
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import './style.css'

export default function Login() {
    const session  = useSession();
    const router = useRouter();

    if (session.status === "authenticated"){
        router?.push('/dashboard');
    }

    

      useEffect(()=>{
        if (session.status === "authenticated") {
            router?.push("/dashboard");
        }

      },[router,session])
    

    return (
        <main className='loginContainer'>
        Not signed in <br />
        <button onClick={() => signIn('google')}>Sign in using Google</button>
        <button onClick={() => signIn('github')}>Sign in using Github</button>
        </main>
    )
}

