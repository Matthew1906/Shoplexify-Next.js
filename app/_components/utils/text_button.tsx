'use client'

import { roboto_semibold } from "@/app/_lib/font";

const TextButton = (
    {theme='primary', text, isForm=false, onClick } : {theme?:string, text:string, isForm?:boolean, onClick?: ()=>void}
) => {
    const themeStyle = theme=='secondary'?"border-navy-blue text-navy-blue bg-white":"border-navy-blue text-white bg-navy-blue";
    return <button
        type={isForm?"submit":"button"} 
        onClick = {onClick??undefined}
        className={`px-5 py-2 border-2 rounded-lg hover:opacity-80 ${roboto_semibold.className} ${themeStyle}`}
    >
        {text}
    </button>
}

export default TextButton;