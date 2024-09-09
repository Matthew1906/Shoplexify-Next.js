import { categories } from "@prisma/client";
import { Suspense } from "react";
import { productsResponse, searchParams } from "@/app/lib/interface";
import { getCategories } from "@/app/services/categories";
import { getProducts } from "@/app/services/products"
import { FilterForm, Pagination } from "./ui";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const dynamic = 'force-dynamic';

export default async function Page({searchParams}:{searchParams?:searchParams}){  
    const categories: Array<categories> | undefined = await getCategories();
    const productData: productsResponse | undefined = await getProducts(searchParams??null);
    const session = await getServerSession(authOptions);
    return <main className="grid grid-cols-7 gap-5 p-10">
        <FilterForm categories={categories} isAdmin={session?.role=='admin'}/>
        <div className="col-span-5">
            <Suspense fallback={<p key={0}>Loading...</p>}>
                <Pagination products={productData}/>
            </Suspense>
        </div>
    </main>
}