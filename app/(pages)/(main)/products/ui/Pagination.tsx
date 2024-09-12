'use client'

import PaginationHeader from "./PaginationHeader";
import PaginationBar from "./PaginationBar";
import ProductCard from "./ProductCard";
import { Product, productsResponse } from "@/app/lib/interface";

const Pagination = ({products}:{products:productsResponse|undefined})=>{
    return (
        <>
            <PaginationHeader total={products?.length??0} page={products?.page??1}/>
            <div className="my-4 grid grid-cols-5 gap-2">
            {products && products.data?.map((product:Product)=>{
                return <ProductCard key={product.slug} product={product}/>
            })}
            </div>
            <PaginationBar total={products?.length??0} page={products?.page??1}/>
        </>
    );
}

export default Pagination;