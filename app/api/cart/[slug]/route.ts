import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest, { params }: { params: { slug: string } }){
    try{
        const sessionData = await getServerSession();
        const slug = params.slug;
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({where:{email:sessionData?.user?.email}});
            const product = await prisma.products.findFirst({where:{slug:slug}});
            if(user && product) {
                const order = await prisma.orders.findFirst({
                    where:{
                        user_id:user.id,
                        product_id:product.id
                    }
                })
                return Response.json({status:true, quantity:order?.quantity??0});
            }
            return Response.json({status:false});
        }
        return Response.json({status:false});
    } catch(error){ 
        console.log(error)
    }
}

export async function POST(req:NextRequest){
    try{
        // add order detail
        const formData = await req.formData();
        const quantity = parseInt(formData.get('quantity')?.toString()??"0");
        const slug = formData.get('product')?.toString();
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({where:{email:sessionData?.user?.email}});
            const product = await prisma.products.findFirst({where:{slug:slug}});
            if(user && product) {
                const order = await prisma.orders.findFirst({
                    where:{
                        user_id:user.id,
                        product_id:product.id
                    }
                })
                const updatedProduct = await prisma.products.update({
                    where: { slug: slug },
                    data: { stock: { increment:order!==null?order?.quantity:0 }}
                })
                if(updatedProduct.stock>=quantity){
                    if(order){
                        await prisma.orders.update({
                            where:{ user_id_product_id: { user_id: user.id, product_id: product.id} },
                            data:{ quantity: quantity }
                        })
                    } else {
                        await prisma.orders.create({
                            data:{ user_id: user.id, product_id: product.id, quantity: quantity }
                        })
                    }
                    await prisma.products.update({
                        where: { slug: slug },
                        data: { stock: { decrement:quantity }}
                    })
                    revalidatePath('/products/' + slug);
                    revalidatePath('/cart');
                    return Response.json({status:true});
                }
                return Response.json({status:false});
            }
        }
    } catch (error){
        console.log(error);
    }
}