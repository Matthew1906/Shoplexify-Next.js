import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    try{
        const sessionData = await getServerSession();
        console.log(sessionData)
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
                    image_url:order.products.image_url,
                    num_sold: quantities.reduce((a,b)=>a+b, 0),
                    avg_rating: Math.fround(ratings.reduce((a,b)=>a+b, 0)/ratings.length),
                    rated_by: ratings.length
                }
            })
            return Response.json({ data: orders })
        }
        return Response.json({ status:true });
    } catch(error){
        console.log(error);
    }
}