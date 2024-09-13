'use server'

import { headers } from "next/headers";
import { adminMetric, adminSearchParams, adminTransactions, Product } from "../lib/interface";

export const getMetrics = async():Promise<adminMetric|undefined>=>{
    try {
        const url = `${process.env.SERVER_URL}/api/admin`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}

export const getTopProducts = async(searchParams: adminSearchParams|null):Promise<Array<Product>|undefined>=>{
    try {
        const editableParams = new URLSearchParams();
        if(searchParams?.month){
            editableParams.set("month", searchParams.month.toString());
        } else {
            editableParams.set("month", new Date().getMonth().toString())
        }
        const url = `${process.env.SERVER_URL}/api/admin/products?${editableParams.toString()}`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse.topProducts;
    } catch(error) {
        console.log(error);
    }
}

export const getTransactions = async():Promise<Array<adminTransactions> | undefined>=>{
    try {
        const url = `${process.env.SERVER_URL}/api/transactions`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse.data;
    } catch(error){
        console.log(error);
    }
}