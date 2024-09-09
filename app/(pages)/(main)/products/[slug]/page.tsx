import Image from "next/image";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { MdStar } from "react-icons/md";
import { roboto_light, roboto_regular, roboto_semibold } from "@/app/lib/font";
import { productResponse, reviewResponse } from "@/app/lib/interface";
import { currencyString, popularityString } from "@/app/lib/string";
import { getProduct } from "@/app/services/products";
import OrderSection from "@/app/components/OrderSection";
import { ReviewButton, ReviewItem, UpdateProductButton } from "./ui";
import { getReview } from "@/app/services/reviews";
import { authOptions } from "@/app/lib/auth";
import { TextButton } from "@/app/components/buttons";

export default async function ProductPage( 
    {params}:{params:{slug:string}}
){
    const product: productResponse | undefined = await getProduct(params.slug);
    const review: reviewResponse | undefined = await getReview(params.slug);
    const session = await getServerSession(authOptions);
    return <main className={`${roboto_regular.className} px-10 py-5`}>
        <Suspense fallback={"Loading..."}>
            { product && <>
            <section id="product-info" className="flex items-start gap-5">
                <Image 
                    src={product?.image_url}
                    alt={product?.slug}
                    width={350}
                    height={350}
                />
                <div className="pt-2 pb-4 col-span-3 flex flex-col items-start gap-5">
                    <b className={`block mt-2 ${roboto_light.className} text-3xl`}>{product.name}</b>
                    <em className="flex items-center gap-1 text-xl">
                        <span>Sold: {popularityString(product.num_sold)} •  </span>
                        <MdStar className="text-yellow w-6 h-6"/>
                        <span>{product.avg_rating??0} (rated by {popularityString(product.reviews?.length??0)}) </span>
                    </em>
                    <strong className={`block mb-1 text-2xl ${roboto_semibold.className}`}>{currencyString(product.price)}</strong>
                    <p className={`${roboto_regular.className} text-lg`}>
                        {product.description}
                    </p>
                </div>
                <div className="">
                { session && <OrderSection product={product?.slug} 
                    stock={product?.stock??0} price={product.price}
                /> }
                { session?.role == 'admin' && <UpdateProductButton /> }
                </div>
                
            </section>
            { ((product.reviews?.length??0) > 0 || (review?.status && review.hasPurchased))  &&
                <section id="product-reviews" className="mt-10 border-t-2 border-b-2 border-navy-blue py-10">
                    <div className="flex items-center gap-5 mb-5">
                        <p className={`${roboto_semibold.className} text-xl`}>Reviews:</p>
                        { session && <ReviewButton review={review?.review} slug={product?.slug}/> }
                    </div>
                    <div className="px-2 text-lg">
                        {product.reviews?.map((review)=>{
                            return <ReviewItem key={review.user} name={review.user} body={review.review} rating={review.rating} />
                        })}
                    </div>
                </section>
            }
            {/* Recommended products -> TBD */}
            </> }
        </Suspense>
        
    </main>
}
