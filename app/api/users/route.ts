import { z } from 'zod';
import prisma from '@/app/_lib/prisma';
import { generatePassword } from '@/app/_lib/auth';

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
        console.log(error);
    }
}