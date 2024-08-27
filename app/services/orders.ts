'use server'

import { headers } from "next/headers";
import { orderResponse } from "../lib/interface";

export const getOrders = async():Promise<Array<orderResponse>|undefined>=>{
    const url = `${process.env.SERVER_URL}/api/cart`;
    const response = await fetch(url, { method: 'GET', headers:headers() });
    const jsonResponse = await response.json();
    return jsonResponse.data;
}

export const getOrder = async(product:string)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const response = await fetch(url, { method:'GET' });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const createOrder = async(product:string, quantity:number)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const formData = new FormData();
    formData.append("quantity", quantity.toString());
    formData.append("product", product);
    await fetch(url, { method: "POST", body: formData });
}