import { headers } from "next/headers";
import { transactionHistoryResponse } from "../lib/interface";

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