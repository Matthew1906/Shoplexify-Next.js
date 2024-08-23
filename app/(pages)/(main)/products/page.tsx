import { categories } from "@prisma/client";
import { Suspense } from "react";
import { productResponse, searchParams } from "@/app/_lib/interface";
import { getCategories } from "@/app/_services/categories";
import { getProducts } from "@/app/_services/products"
import FilterForm from "./_ui/FilterForm";
import Pagination from "./_ui/Pagination";

export default async function Page(
    {searchParams}:{searchParams?:searchParams}
){  
    const categories: Array<categories> | undefined = await getCategories();
    const productData: productResponse | undefined = await getProducts(searchParams??null);
    return <main className="grid grid-cols-7 gap-5 p-10">
        <FilterForm categories={categories} />
        <div className="col-span-5">
            <Suspense fallback={<p key={0}>Loading...</p>}>
                <Pagination products={productData}/>
            </Suspense>
        </div>
    </main>
}