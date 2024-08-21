'use client'

import { useSession } from "next-auth/react";
import { Header } from "@/app/_components/partials";

export default function RootLayout(
    { children }:
    Readonly<{children: React.ReactNode}>
) {
    const session = useSession();
    return (
        <>
            <Header isAuth={false} isLoggedIn={session.status=='authenticated'} isAdmin={session.data?.role=='admin'} username={session.data?.name}/>
            {children}
        </>
    );
    }
