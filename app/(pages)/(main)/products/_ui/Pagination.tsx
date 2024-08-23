'use client'

import { Product, productResponse } from "@/app/_lib/interface";
import PaginationHeader from "./PaginationHeader";
import PaginationBar from "./PaginationBar";
import ProductCard from "./ProductCard";

const Pagination = (
    {products}:{products:productResponse|undefined}
)=>{
    return (
        <>
            <PaginationHeader total={products?.length??0} page={products?.page??0}/>
            <div className="my-4 grid grid-cols-5 gap-2">
            {products && products.data?.map((product:Product)=>{
                return <ProductCard key={product.slug} product={product}/>
            })}
            </div>
            <PaginationBar total={products?.length??0} page={products?.page??0}/>
        </>
    );
}

export default Pagination;