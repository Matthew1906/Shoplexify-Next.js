'use server'

import { Product, searchParams } from "../_lib/interface";

export const getProducts = async(searchParams: searchParams|null): Promise<Array<Product>|undefined>=>{
    try {
        const query = (searchParams?.query??null) && `query=${searchParams?.query}`
        const categories = (searchParams?.categories??null) && `categories=${searchParams?.categories}`
        const minPrice = (searchParams?.minPrice??null) && `minPrice=${searchParams?.minPrice}`
        const maxPrice = (searchParams?.maxPrice??null) && `maxPrice=${searchParams?.maxPrice}`
        const rating = (searchParams?.rating??null) && `rating=${searchParams?.rating}`
        const params = [ query, categories, minPrice, maxPrice, rating ].filter(val=>val && val!=="").join("&");
        const url = `${process.env.SERVER_URL}/api/products${params.length>0?"?"+params:""}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        return jsonResponse.data ;
    } catch(error){
        console.log(error)
    }
}