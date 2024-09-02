'use server'

import { z } from 'zod';
import { comparePassword } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';

export async function POST(req:Request){
    try {
        const formData = await req.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const parsedCredentials = z.object({ 
            email: z.string().email(), 
            password: z.string().min(5)
        }).safeParse({email, password});
        if(parsedCredentials.success){
            const user = await prisma.users.findFirst({where:{email:parsedCredentials.data.email}});
            if(!user){
                return Response.json({status:false, message:"Account does not exist!"});
            }
            const isSamePassword = await comparePassword(password?.toString()??"", user.password);
            if(isSamePassword){
                return Response.json({status:true, message:"Login Successful"});
            } else {
                return Response.json({status:false, message:"Password doesnt match"});
            }
        } else if (parsedCredentials.error){
            return Response.json({status:false, error:parsedCredentials.error.flatten().fieldErrors});
        }
    } catch (error){
        console.log(error);
    }
}