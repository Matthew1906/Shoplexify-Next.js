import { Product, searchParams } from "@/app/_lib/interface";
import { getCategories } from "@/app/_services/categories";
import { getProducts } from "@/app/_services/products"
import { categories } from "@prisma/client";
import { Suspense } from "react";
import FilterForm from "./_ui/FilterForm";

export default async function Page(
    {searchParams}:{searchParams?:searchParams}
){  
    const categories: Array<categories> | undefined = await getCategories();
    const products: Array<Product> | undefined = await getProducts(searchParams??null);
    return <div className="grid grid-cols-7 gap-5 p-10">
        <FilterForm categories={categories} />
        <div className="col-span-5">
            <Suspense fallback={<p key={0}>Loading...</p>}>
                {products && products.map((product:Product)=>{
                    return <p key={product.slug}>{product.name}</p>
                })}
            </Suspense>
        </div>
    </div>
}