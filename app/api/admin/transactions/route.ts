import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { orderMetrics } from "@/app/lib/interface";

export async function GET(req:NextRequest) {
    try {
        const sessionData = await getServerSession();
        if(sessionData?.user?.email){
            const user = await prisma.users.findFirst({where:{email:sessionData.user.email}});
            if(!user || user.id!=1){
                return Response.json({ status:false });
            } 
            const orderMetrics: orderMetrics = await prisma.$queryRaw`
                SELECT DATE_PART('month', date) AS month, CAST(COUNT(*) AS int) AS total
                FROM transactions GROUP BY month`
            return Response.json({ 
                status: true, 
                data: orderMetrics
            })
        }
        return Response.json({ status:false });
    } catch (error) {
        return Response.json({ status:false, message:error });
    }
}