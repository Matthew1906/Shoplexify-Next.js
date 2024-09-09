'use server'

import { headers } from "next/headers";

export const getUser = async()=>{
    try {
        const url = `${process.env.SERVER_URL}/api/users`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}