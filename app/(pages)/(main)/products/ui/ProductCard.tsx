import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";
import { roboto_light, roboto_semibold } from "@/app/lib/font";
import { Product } from "@/app/lib/interface"
import { currencyString, popularityString, trimString } from "@/app/lib/string";

const ProductCard = ({product}:{product:Product})=>{
    return <Link href={`/products/${product.slug}`} prefetch>
        <div className="w-full h-full p-4 shadow-lg shadow-neutral-400">
            <Image 
                src={product.image_url} 
                alt={`shoplexify-${product.slug}`} 
                width={200} 
                height={300}
                // objectFit="cover"
                className="rounded-md opacity-95 h-[60%]"
            />
            <b className={`block mt-2 ${roboto_light.className} text-lg`}>{trimString(product.name, 20)}</b>
            <strong className={`block mb-1 ${roboto_semibold.className}`}>{currencyString(product.price)}</strong>
            <em className="flex items-center gap-1">
                <MdStar className="text-yellow w-6 h-6"/>
                <span>{product.avg_rating??0} | {popularityString(product.num_sold)} sold </span>
            </em>
        </div>
    </Link>
}

export default ProductCard;