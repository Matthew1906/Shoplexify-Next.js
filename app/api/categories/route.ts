import prisma from "@/app/_lib/prisma";

export async function GET(req:Request){
    try{
        const categories = await prisma.categories.findMany();
        return Response.json({data:categories});
    } catch (error) {
        console.log(error);
    }
}