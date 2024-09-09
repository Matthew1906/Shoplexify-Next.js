'use server'

import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(){
    try {
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({where:{email:sessionData.user.email}});
            if(!user){
                return Response.json({ status:false });
            } 
            const transactionData = await prisma.transactions.findMany({
                where:{
                    user_id: user.id
                },
                select:{
                    id: true,
                    date: true,
                    delivery_status: true,
                    delivery_cost: true,
                    payment_status: true,
                    transaction_details:{
                        select:{
                            price: true,
                            quantity: true
                        }
                    }
                }
            })
            const transactions = transactionData.map(transaction=>{
                return {
                    id: transaction.id,
                    date: transaction.date,
                    status: transaction.payment_status == 'Unpaid' 
                        ? 'Unpaid' 
                        : transaction.payment_status == 'Paid' && transaction.delivery_status == 'Unsent' 
                        ? 'On Process' 
                        : 'Delivered',
                    total_price: transaction.delivery_cost + 
                        transaction.transaction_details.reduce((a, b)=>a + b.price * b.quantity, 0)
                }
            })
            return Response.json({ status: true, data: transactions })
        }
        return Response.json({ status:false });
    } catch(error) {
        return Response.json({ status:false, message:error })
    }
}