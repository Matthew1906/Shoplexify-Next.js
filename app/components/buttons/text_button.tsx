'use client'

import { roboto_semibold } from "@/app/lib/font";

const TextButton = (
    {theme='primary', text, isForm=false, onClick, className } : {theme?:string, text:string, isForm?:boolean, onClick?: ()=>void, className?:string}
) => {
    const themeStyle = theme=='secondary'?"border-navy-blue text-navy-blue bg-white":"border-white text-white bg-navy-blue";
    return <button
        type={isForm?"submit":"button"} 
        onClick = {onClick??undefined}
        className={`px-5 py-2 border-2 rounded-lg hover:opacity-80 ${roboto_semibold.className} ${themeStyle} ${className??""}`}
    >
        {text}
    </button>
}

export default TextButton;