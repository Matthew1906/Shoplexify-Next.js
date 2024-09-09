'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { TextButton } from "@/app/components/buttons";
import { roboto_bold, roboto_regular, roboto_semibold } from "@/app/lib/font";
import { authResponse } from "@/app/lib/interface";

export default function Register(){
    const [ errorStatus, setErrorStatus ] = useState<authResponse>();
    const router = useRouter();
    const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/users', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        setErrorStatus({status:data.status, error:data?.error, message:data?.message});
        if(data.status){
            router.push('/login');
            router.refresh();
        }
    }
    return <main className='p-5 w-full flex justify-center items-start'>
        <form onSubmit={handleSubmit} className="p-10 bg-white border-1 border-black rounded-lg w-1/4 flex-center flex-col gap-2 drop-shadow-md">
            <h3 className={`${roboto_bold.className} text-2xl mb-2`}>Register an Account</h3>
            <div className="w-full">
                <label htmlFor="username" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Username</label>
                { errorStatus?.status && errorStatus?.error?.username && 
                  <p className={`${roboto_semibold.className} text-red px-1`}>{errorStatus.error?.username}</p>
                }
                <input type="text" name="username" id="username" className="mb-2 border border-black border-opacity-75 rounded-md w-full text-lg px-2 py-1"/>
            </div>
            <div className="w-full">
                <label htmlFor="email" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Email</label>
                { !errorStatus?.status && errorStatus?.error?.email && 
                  <p className={`${roboto_semibold.className} text-red px-1`}>{errorStatus.error?.email}</p>
                }
                <input type="email" name="email" id="email" className="mb-2 border border-black border-opacity-75 rounded-md w-full text-lg px-2 py-1"/>
            </div>
            <div className="w-full">
                <label htmlFor="password" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Password</label>
                { !errorStatus?.status && errorStatus?.error?.password && 
                  <p className={`${roboto_semibold.className} text-red px-1`}>{errorStatus.error?.password}</p>
                }
                <input type="password" name="password" id="password" className="mb-2 border border-black border-opacity-75 rounded-md w-full text-lg px-2 py-1"/>
            </div>
            <div className="w-full">
                <label htmlFor="confirmPassword" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Confirm Password</label>
                { !errorStatus?.status && errorStatus?.error?.confirmPassword && 
                  <p className={`${roboto_semibold.className} text-red px-1`}>{errorStatus.error?.confirmPassword}</p>
                }
                <input type="password" name="confirmPassword" id="confirmPassword" className="mb-2 border border-black border-opacity-75 rounded-md w-full text-lg px-2 py-1"/>
            </div>
            <p className={`mb-2 text-xs ${roboto_regular.className}`}>Already have an account? Click <Link href="/login" className="underline hover:text-red hover:decoration-red">here</Link> to login!</p>
            <TextButton text="Submit" isForm/>
        </form>
    </main>
}
