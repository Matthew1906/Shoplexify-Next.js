'use server'

import prisma from '@/app/lib/prisma';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { comparePassword, generatePassword } from '@/app/lib/auth';

export async function POST(req:Request){
    try {
        const formData = await req.formData();
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const parsedCredentials = z.object({
            username: z.string().max(255), 
            email: z.string().email(), 
            password: z.string().min(5),
            confirmPassword: z.string().min(5)
        }).safeParse({username, email, password, confirmPassword});
        if(parsedCredentials.success){
            if (parsedCredentials.data.password != parsedCredentials.data.confirmPassword){
                return Response.json({status:false, error:{confirmPassword:"Confirm password doesnt match with the password!"}});
            }
            const userAlreadyExist = await prisma.users.count({where:{email:parsedCredentials.data.email}});
            if(userAlreadyExist>0){
                return Response.json({status:false, message:"Account already exist!"});
            }
            const newPassword = await generatePassword(parsedCredentials.data.password);
            await prisma.users.create({
                data:{
                    name: parsedCredentials.data.username,
                    email: parsedCredentials.data.email,
                    password: String(newPassword)
                }
            })
            return Response.json({status:true})
        } else if (parsedCredentials.error){
            return Response.json({status:false, error:parsedCredentials.error.flatten().fieldErrors});
        }
    } catch (error){
        return Response.json({status:false})
    }
}

export async function PATCH(req:Request){
    try {
        const formData = await req.formData();
        const dob = new Date(formData.get("dob")?.toString()??"");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const parsedCredentials = z.object({
            dob:z.date()
                .min(new Date("1900-01-01"), { message: "Too old" })
                .max(new Date("2014-01-01"), { message: "Too young" }),
            password: z.string().min(5),
            confirmPassword: z.string().min(5)
        }).safeParse({dob, password, confirmPassword});
        if(parsedCredentials.success){
            if (parsedCredentials.data.password != parsedCredentials.data.confirmPassword){
                return Response.json({status:false, error:{confirmPassword:"Confirm password doesnt match with the password!"}});
            }
            const sessionData = await getServerSession();
            if(sessionData?.user?.email){
                const user = await prisma.users.findFirst({where:{email:sessionData.user.email}});
                if(!user){
                    return Response.json({status:false, message:"Account doesn't exists!"})
                }
                const isSamePassword = await comparePassword(parsedCredentials.data.password, user.password);
                if(isSamePassword){
                    return Response.json({status:false, error:{password:"This is your old password!"}});
                }
                const newPassword = await generatePassword(parsedCredentials.data.password); 
                await prisma.users.update({
                    where:{id:user.id},
                    data:{
                        dob: parsedCredentials.data.dob,
                        password: String(newPassword),
                    }
                })
                return Response.json({status:true})
            }
            return Response.json({status:false, message:"Account doesn't exists!"})
        } else if (parsedCredentials.error){
            return Response.json({status:false, error:parsedCredentials.error.flatten().fieldErrors});
        }
    } catch (error){
        return Response.json({status:false, message:error})
    }
}