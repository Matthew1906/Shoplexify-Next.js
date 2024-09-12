'use server'

import { headers } from "next/headers";
import { reviewResponse } from "@/app/lib/interface";

export const createReview = async(formData: FormData)=>{
    try {
        const url = `${process.env.SERVER_URL}/api/reviews`;
        const cookieHeader = new Headers();
        const cookies = headers().get("cookie")??"";
        cookieHeader.set("cookie", cookies);
        const response = await fetch(url, { 
            method:'POST', 
            headers:cookieHeader, 
            body: formData
        });
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

export const getReview = async(productSlug:string):Promise<reviewResponse|undefined>=>{
    try {
        const url = `${process.env.SERVER_URL}/api/reviews/${productSlug}`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}
