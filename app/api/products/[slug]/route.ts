'use server'

import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, { params }: { params: { slug: string } }){
    try {
        const slug = params.slug;
        const data = await prisma.products.findFirst({
            where:{ slug: slug.toString() },
            select:{ 
                slug:true,
                name:true, 
                description: true,
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
                        rating: true,
                        review: true,
                        users:{
                            select:{
                                name: true
                            }
                        }
                    }
                }
            }
        })
        let quantities = data?.transaction_details.map(detail=>detail.quantity)??[];
        let ratings = data?.reviews.map(review=>review.rating)??[]
        const product = {
            slug:data?.slug,
            name:data?.name, 
            description: data?.description,
            price:data?.price,
            stock:data?.stock,
            image_url:data?.image_url,
            num_sold: quantities.reduce((a,b)=>a+b, 0),
            avg_rating: Math.fround(ratings.reduce((a,b)=>a+b, 0)/ratings.length),
            reviews: data?.reviews.map(review=>({
                user: review.users?.name,
                rating: review.rating,
                review: review.review
            })),
        }
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
    }
}