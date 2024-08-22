'use client'

import { Product, productResponse } from "@/app/_lib/interface";
import PaginationHeader from "./PaginationHeader";
import PaginationBar from "./PaginationBar";

const Pagination = (
    {products}:{products:productResponse|undefined}
)=>{
    return (
        <div>
            <PaginationHeader total={products?.length??0} page={products?.page??0}/>
            {products && products.data?.map((product:Product)=>{
                return <p key={product.slug}>{product.name} - {product.price}</p>
            })}
            <PaginationBar total={products?.length??0} page={products?.page??0}/>
        </div>
    );
}

export default Pagination;