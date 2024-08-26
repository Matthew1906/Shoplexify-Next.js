import { revalidatePath } from "next/cache";
import { cartResponse } from "../lib/interface";

export const getCart = async():Promise<Array<cartResponse>|undefined>=>{
    const url = `${process.env.SERVER_URL}/api/cart`;
    const response = await fetch(url, { method: 'GET'});
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    revalidatePath("/cart");
    return jsonResponse.data;
}

export const getCartItem = async(product:string)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const response = await fetch(url, { method:'GET' });
    const jsonResponse = await response.json();
    return jsonResponse;
}

export const addToCart = async(product:string, quantity:number)=>{
    const url = `${process.env.SERVER_URL}/api/cart/${product}`;
    const formData = new FormData();
    formData.append("quantity", quantity.toString());
    formData.append("product", product);
    await fetch(url, { method: "POST", body: formData });
}