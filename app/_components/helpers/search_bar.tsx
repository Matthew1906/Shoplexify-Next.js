'use client'

import { roboto_regular } from "@/app/_lib/font";
import { getCategories } from "@/app/_services/categories";
import { categories } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ()=>{
    const [ categories, setCategories ] = useState<Array<categories>|undefined>([])
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    useEffect(()=>{
        console.log(process.env.SERVER_URL);
        getCategories().then(data=>setCategories(data));
    }, [])
    const handleEnter = (event:KeyboardEvent<HTMLInputElement>)=>{
        if(event.key == 'Enter'){
            formRef.current?.requestSubmit();
        }
    }
    const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
        let category = formData.get('category')?.toString();
        let categoryString = category!=""?`categories=${category}`:"";
        let query = formData.get('query')?.toString();
        let queryString = (query??"".length >0) && (categoryString!==''?`&query=${query}`:`query=${query}`)
        router.push(`/products?${categoryString}${queryString}`);
        router.refresh()
    }
    return <form ref={formRef} onSubmit={handleSubmit} className={`mx-2 w-full flex justify-center ${roboto_regular.className}`}>
        <select name="category" id="category" className="p-2 outline-none rounded-l-md border-r-2 border-navy-blue">
            <option className="p-2 rounded-none" key={0} value={""} selected></option>
            {categories && categories.map(category=>{
                return <option className="p-2 rounded-none" key={category.id} value={category.slug}>{category.name}</option>
            })}
        </select>
        <input 
            type="text" name="query" id="query" 
            className="p-2 flex-grow outline-none" 
            onKeyDown={handleEnter}
        />
        <button className="bg-white text-navy-blue p-2 rounded-r-md"><MdSearch className="w-5 h-5" /></button>
    </form>
}

export default SearchBar;