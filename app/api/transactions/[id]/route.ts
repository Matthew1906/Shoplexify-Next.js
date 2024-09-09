'use server'

import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
    try {
        const sessionData = await getServerSession();
        const id = params.id;
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({where:{email:sessionData.user.email}});
            if(!user){
                return Response.json({status:false});
            }
            const transactionHistory = await prisma.transactions.findFirst({
                where:{
                    user_id:user.id,
                    id:parseInt(id)
                },
            });
            if(!transactionHistory){
                return Response.json({status:false});
            }
            const transactionDetails = await prisma.transaction_details.findMany({
                where:{
                    transaction_id:transactionHistory.id,
                }, 
                select:{
                    price:true,
                    quantity: true,
                    products:{
                        select:{
                            slug:true,
                            name:true, 
                            price:true,
                            stock:true,
                            image_url:true,
                            transaction_details:{
                                select:{
                                    quantity: true 
                                }
                            },
                            reviews: {
                                select:{
                                    rating: true
                                }
                            }
                        }
                    }
                }
            })
            const processedDetails = transactionDetails.map(order=>{
                let quantities = order.products.transaction_details.map(detail=>detail.quantity);
                let ratings = order.products.reviews.map(review=>review.rating)
                return {
                    slug:order.products.slug,
                    name:order.products.name, 
                    price:order.price,
                    quantity: order.quantity,
                    image_url:order.products.image_url,
                    num_sold: quantities.reduce((a,b)=>a+b, 0),
                    avg_rating: Math.fround(ratings.reduce((a,b)=>a+b, 0)/ratings.length),
                    rated_by: ratings.length
                }
            })
            return Response.json({
                ...transactionHistory,
                transaction_status: transactionHistory.payment_status == 'Unpaid' 
                ? 'Unpaid' 
                : transactionHistory.payment_status == 'Paid' && transactionHistory.delivery_status == 'Unsent' 
                ? 'On Process' 
                : 'Delivered',
                details: processedDetails
            })
        }
        return Response.json({status:false});
    } catch(error) {
        console.log(error);
    }
}