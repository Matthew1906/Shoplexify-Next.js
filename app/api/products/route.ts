'use server'

import prisma from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        const searchParams = req.nextUrl.searchParams;
        const isQueryExist = (key:string)=>searchParams.get(key)??false;
        const sortBy = searchParams.get('sortBy')??"";
        const page = parseInt(searchParams.get('page')??"1");
        const pageLength:number = parseInt(process.env.PAGE_LENGTH??"5");
        const length = await prisma.products.count({
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
        });
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
            skip: pageLength * (page-1),
            take: pageLength,
            orderBy:[
                isQueryExist('sortBy') 
                ? sortBy == 'name-asc'? { name: 'asc'}
                : sortBy == 'name-desc'? { name: 'desc'} 
                : sortBy == 'price-asc'? { price: 'asc'}
                : sortBy == 'price-desc'? { price: 'desc'}   
                : { id :'asc' } : { id:'asc' }, 
            ],
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
        revalidatePath('/products')
        // const ratings = searchParams.get('rating')?.split(",").map(rating=>parseInt(rating))??[];
        return NextResponse.json({
            page:page,
            length:length,
            data:products
            // data:isQueryExist('rating') 
            // ? products.filter(product=>ratings.includes(Math.ceil(product.avg_rating)))
            // : products
        });
    } catch (error) {
        console.log(error);
    }
}