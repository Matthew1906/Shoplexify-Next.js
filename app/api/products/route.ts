'use server'

import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const isQueryExist = (key:string)=>searchParams.get(key)??false;
        const data = await prisma.products.findMany({
            where:{
                AND:[ 
                    { OR:[
                        isQueryExist('query') ? 
                            { name: { 
                                contains: searchParams.get("query")??"", 
                                mode:"insensitive" 
                            } } : {}, 
                        isQueryExist('query') ? 
                            { description: { 
                                contains: searchParams.get("query")??"", 
                                mode:"insensitive"
                            } } : {}, 
                    ] }, 
                    isQueryExist('categories') ? 
                        { product_categories : { 
                            some: {
                                categories: { 
                                    slug : { in: searchParams.get("categories")?.split(",")??[] } 
                                }
                            }
                        } } : {},
                    isQueryExist('minPrice') ? 
                        { price: { 
                            gte: parseInt(searchParams.get('minPrice')??"")
                        } } : {}, 
                    isQueryExist('maxPrice') ? 
                        { price: { 
                            lte: parseInt(searchParams.get('maxPrice')??"")
                        } } : {}, 
                ]
            }, 
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
        });
        const products = data.map(data=>{
            let quantities = data.transaction_details.map(detail=>detail.quantity);
            let ratings = data.reviews.map(review=>review.rating)
            return {
                slug:data.slug,
                name:data.name, 
                price:data.price,
                image_url:data.image_url,
                num_sold: quantities.reduce((a,b)=>a+b, 0),
                avg_rating: Math.fround(ratings.reduce((a,b)=>a+b, 0)/ratings.length)
            }
        })
        const ratings = searchParams.get('rating')?.split(",").map(rating=>parseInt(rating))??[];
        return NextResponse.json({
            data:isQueryExist('rating') 
            ? products.filter(product=>ratings.includes(Math.ceil(product.avg_rating)))
            : products
        });
    } catch (error) {
        console.log(error);
    }
}