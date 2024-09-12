'use server'

import { headers } from "next/headers";
import { transactionHistoryResponse, transactionResponse } from "@/app/lib/interface";

export const getTransactions = async():Promise<Array<transactionResponse> | undefined>=>{
    try {
        const url = `${process.env.SERVER_URL}/api/transactions`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse.data;
    } catch(error){
        console.log(error);
    }
}

export const getTransactionHistory = async (transactionId:number):Promise<transactionHistoryResponse|undefined>=>{
    try{
        const url = `${process.env.SERVER_URL}/api/transactions/${transactionId}`;
        const response = await fetch(url, {method:'GET', headers:headers()});
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch(error) {
        console.log(error);
    }
}