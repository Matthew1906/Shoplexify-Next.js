'use server'

import { revalidatePath } from "next/cache";
import { Product, productResponse, productsResponse, searchParams } from "../lib/interface";

export const getProducts = async(searchParams: searchParams|null): Promise<productsResponse|undefined>=>{
    try {
        const editableParams = new URLSearchParams();
        if(searchParams?.query){
            editableParams.set("query", searchParams?.query);
        } 
        if(searchParams?.categories){
            editableParams.set("categories", searchParams?.categories);
        } 
        if(searchParams?.minPrice){
            editableParams.set("minPrice", searchParams?.minPrice.toString());
        } 
        if(searchParams?.maxPrice){
            editableParams.set("maxPrice", searchParams?.maxPrice.toString());
        } 
        // if(searchParams?.rating){
        //     editableParams.set("rating", searchParams?.rating);
        // } 
        if(searchParams?.sortBy){
            editableParams.set("sortBy", searchParams?.sortBy);
        } 
        if(searchParams?.page){
            editableParams.set("page", searchParams?.page.toString());
        } 
        const url = `${process.env.SERVER_URL}/api/products?${editableParams.toString()}`;
        const response = await fetch(url, {method:"GET"});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error){
        console.log(error)
    }
}

export const getProduct = async(slug:string):Promise<productResponse|undefined> =>{
    try {
        const url = `${process.env.SERVER_URL}/api/products/${slug}`;
        const response = await fetch(url, {method:'GET'});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}