import prisma from "@/app/lib/prisma";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
    pages:{
        signIn: '/login'
    },
    session:{
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60
    },
    providers: [
        Credentials({
            name: 'Credentials',
            async authorize(credentials) {
                'use server';
                const user = await prisma.users.findFirst({
                    where: { email: credentials.email }
                });
                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                    role: user.id == 1 ? 'admin':'user'
                };
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks: {
        session:({session, token})=>{
            return token;
        },
        jwt:({token, user})=>{
            if(user){
                return {...token, id:user.id, name:user.name, email:user.email, role:user.id == 1 ?"admin":'user'}
            }
            return token;
        },        
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }