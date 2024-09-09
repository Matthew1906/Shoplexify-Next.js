'use server'

import { headers } from "next/headers";
import { orderResponse } from "../lib/interface";

export const getOrders = async():Promise<Array<orderResponse>|undefined>=>{
    const url = `${process.env.SERVER_URL}/api/cart`;
    const response = await fetch(url, { method: 'GET', headers:headers() });
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

export const checkoutOrders = async(formData: FormData)=>{
    const url = `${process.env.SERVER_URL}/api/cart`;
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
}

export const deleteOrders = async()=>{
    const url = `${process.env.SERVER_URL}/api/cart`;
    await fetch(url, { method: 'DELETE', headers:headers() });
}

export const getOrder = async(product:string)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const response = await fetch(url, { method:'GET', headers:headers() });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const createOrder = async(product:string, quantity:number)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const formData = new FormData();
    formData.append("quantity", quantity.toString());
    const cookieHeader = new Headers();
    const cookies = headers().get("cookie")??"";
    cookieHeader.set("cookie", cookies);
    await fetch(url, { method: "POST", body: formData, headers: cookieHeader });
}

export const editOrder = async(product:string, quantity:number)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const formData = new FormData();
    formData.append("quantity", quantity.toString());
    const cookieHeader = new Headers();
    const cookies = headers().get("cookie")??"";
    cookieHeader.set("cookie", cookies);
    await fetch(url, { method: "PATCH", body: formData, headers: cookieHeader });
}

export const deleteOrder = async(product:string)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const cookieHeader = new Headers();
    const cookies = headers().get("cookie")??"";
    cookieHeader.set("cookie", cookies);
    await fetch(url, { method: "DELETE", headers: cookieHeader });
}