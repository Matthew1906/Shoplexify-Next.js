'use server'

import { Product, searchParams } from "../_lib/interface";

export const getProducts = async(searchParams: searchParams|null): Promise<Array<Product>|undefined>=>{
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
        if(searchParams?.rating){
            editableParams.set("rating", searchParams?.rating);
        } 
        if(searchParams?.sortBy){
            editableParams.set("sortBy", searchParams?.sortBy);
        } 
        const url = `${process.env.SERVER_URL}/api/products?${editableParams.toString()}`;
        const response = await fetch(url, {method:"GET"});
        const jsonResponse = await response.json();
        return jsonResponse.data ;
    } catch(error){
        console.log(error)
    }
}