'use client'

import { roboto_semibold } from "@/app/_lib/font";

const Footer = ()=>{
    // mt-auto is a temporary alternative, should look into this later
    return <footer className='mt-auto w-full h-auto py-8 bg-navy-blue flex-center'>
        <p className={`${roboto_semibold.className} text-white text-sm`}>Copyright &copy; Matthew1906&apos;s Online Shop Project 2024</p>
    </footer>
}

export default Footer;