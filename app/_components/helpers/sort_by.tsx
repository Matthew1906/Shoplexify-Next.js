'use client'

import { roboto_regular, roboto_semibold } from "@/app/_lib/font";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

const SortBy = ()=>{
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleSelect = (event:FormEvent<HTMLSelectElement>)=>{
        event.preventDefault()
        const sortBy = event.currentTarget.value;
        const editableParams =  new URLSearchParams(searchParams);
        editableParams.set("sortBy", sortBy);
        editableParams.set("page", "1");
        router.push(`${pathname}?${editableParams.toString()}`);
        router.refresh(); 
    }
    return <div className={`flex-center gap-4 ${roboto_regular.className}`}>
        <p className="text-lg">Sort by: </p>
        <select 
            name="sortBy" 
            id="sortby" 
            onChange={handleSelect} 
            className="py-2 px-5 bg-navy-blue rounded-lg text-white"
        >
            <option value="name-asc">A to Z</option>
            <option value="name-desc">Z to A</option>
            <option value="price-asc">⮝ Price</option>
            <option value="price-desc">⮟ Price</option>
            {/* <option value="rating-asc">⮝ Rating</option>
            <option value="rating-desc">⮟ Rating</option> */}
        </select>
    </div>
};

export default SortBy;