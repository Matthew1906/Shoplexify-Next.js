'use server'

import { headers } from "next/headers";

export const getMetrics = async()=>{
    try {
        const url = `${process.env.SERVER_URL}/api/admin`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse.data;
    } catch(error) {
        console.log(error);
    }
}

export const getTopProducts = async()=>{
    try {
        const url = `${process.env.SERVER_URL}/api/admin/products`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse.data;
    } catch(error) {
        console.log(error);
    }
}