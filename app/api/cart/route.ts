'use server'

import prisma from "@/app/lib/prisma";
import { orders } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try{
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({
                where:{email:sessionData.user.email}
            })
            const orderData = await prisma.orders.findMany({
                where:{
                    user_id:user?.id
                },
                select:{
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
            const orders = orderData.map(order=>{
                let quantities = order.products.transaction_details.map(detail=>detail.quantity);
                let ratings = order.products.reviews.map(review=>review.rating)
                return {
                    slug:order.products.slug,
                    name:order.products.name, 
                    price:order.products.price,
                    quantity: order.quantity,
                    stock: order.products.stock,
                    image_url:order.products.image_url,
                    num_sold: quantities.reduce((a,b)=>a+b, 0),
                    avg_rating: Math.fround(ratings.reduce((a,b)=>a+b, 0)/ratings.length),
                    rated_by: ratings.length
                }
            })
            return Response.json({ data: orders })
        }
        return Response.json({ status:false });
    } catch(error){
        console.log(error);
    }
}

export async function POST(req: NextRequest){
    try {
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({
                where:{email:sessionData.user.email}
            })
            if(!user){
                return Response.json({ status:false });
            }
            const formData = await req.formData();
            const address = formData.get("address")?.toString();
            const deliveryFee = parseInt(formData.get("deliveryFee")?.toString()??"0");
            const orders = await prisma.orders.findMany({
                where:{ user_id: user.id },
                include:{
                    products: true
                }
            });
            if(orders.length<=0){
                return Response.json({ status:false });
            } else {
                const newTransaction = await prisma.transactions.create({
                    data:{
                        date: new Date(),
                        address: address??"",
                        delivery_cost: deliveryFee,
                        delivery_status: 'Unsent',
                        payment_method: 'Unknown',
                        payment_status: 'Unpaid',
                        user_id: user.id
                    }
                });
                await Promise.all(orders.map(async(order:orders)=>{
                    const product = await prisma.products.findFirst({
                        where:{ id: order.product_id }
                    });
                    await prisma.transaction_details.create({
                        data:{
                            transaction_id:newTransaction.id,
                            quantity: order.quantity,
                            price: product?.price??0,
                            product_id: order.product_id
                        }
                    });
                }));
                await prisma.orders.deleteMany({
                    where:{
                        user_id:user.id
                    }
                });
                return Response.json({ status:true, transactionId:newTransaction.id });
            }
        }
        return Response.json({ status:false });
    } catch(error) {
        console.log(error);
    }
}

export async function DELETE(req: NextRequest){
    try {
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({
                where:{email:sessionData.user.email}
            })
            if(!user){
                return Response.json({ status:false });
            }
            const orders = await prisma.orders.findMany({
                where:{
                    user_id:user?.id
                }
            })
            await Promise.all(
                orders.map(async order=>{
                    await prisma.products.update({
                        where:{id:order.product_id},
                        data:{stock:{increment:order.quantity}}
                    })
                })
            );
            await prisma.orders.deleteMany({
                where:{
                    user_id:user?.id
                }
            })
            return Response.json({ status:true });
        }
        return Response.json({ status:false });
    } catch(error){
        console.log(error);
    }
}