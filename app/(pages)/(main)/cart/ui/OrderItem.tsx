import { roboto_light, roboto_semibold } from "@/app/lib/font";
import { orderResponse } from "@/app/lib/interface";
import { currencyString, popularityString } from "@/app/lib/string";
import Image from "next/image";
import { MdStar } from "react-icons/md";

const CartItem = ({item}:{item:orderResponse})=>{
    return <div className="flex">
         <Image 
            src={item?.image_url}
            alt={item?.slug}
            width={350}
            height={350}
            // objectFit="cover"
        />
        <div className="pt-2 pb-4 col-span-3 flex flex-col items-start gap-5">
            <b className={`block mt-2 ${roboto_light.className} text-3xl`}>{item.name}</b>
            <em className="flex items-center gap-1 text-xl">
                <span>Sold: {popularityString(item.num_sold)} •  </span>
                <MdStar className="text-yellow w-6 h-6"/>
                <span>{item.avg_rating??0} (rated by {popularityString(item.rated_by??0)}) </span>
            </em>
            <strong className={`block mb-1 text-2xl ${roboto_semibold.className}`}>{currencyString(item.price)}</strong>
        </div>
    </div>
}

export default CartItem;