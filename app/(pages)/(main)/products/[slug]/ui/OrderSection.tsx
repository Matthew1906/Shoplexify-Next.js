'use client'

import { roboto_regular } from "@/app/lib/font";
import { currencyString } from "@/app/lib/string";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TextButton } from "@/app/components/utils";
import { useSession } from "next-auth/react";
import { createOrder, getOrder } from "@/app/services/orders";
import { useRouter } from "next/navigation";

const CartSection = ({type, product, stock, price}:{type:string, product:string, stock:number, price:number})=>{
    const router = useRouter();
    const [orderQuantity, setOrderQuantity] = useState<number>(0);
    const [initialQuantity, setInitialQuantity] = useState<number>(0);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const reduceOrderQuantity = ()=>{
        if(orderQuantity>0){
            setOrderQuantity(orderQuantity-1);
        }
    }
    const addOrderQuantity = ()=>{
        if(orderQuantity<stock){
            setOrderQuantity(orderQuantity+1);
        }
    }
    const session = useSession();
    useEffect(()=>{
        getOrder(product).then((res)=>{
            if(res.status){
                setInitialQuantity(res.quantity);
                setOrderQuantity(res.quantity);
            }
        })
    }, [isChanged]);
    const submitCart = ()=>createOrder(product, orderQuantity).then(()=>{
        setIsChanged(!isChanged);
        router.refresh()
        alert("Product has been added to cart!");
    });
    return <div className="px-4 py-2 border-navy-blue border-2 rounded-lg text-center text-lg">
        {type=='product' && <p className={`${roboto_regular.className} mb-4`}>Set amounts and orders:</p>}
        <div className="flex-center gap-5 mb-4">
            <div className="border-navy-blue border-2 rounded-lg p-2 flex-center gap-4" >
                <FaMinus onClick={reduceOrderQuantity} className="cursor-pointer"/>
                <p>{orderQuantity}</p>
                <FaPlus onClick={addOrderQuantity} className="cursor-pointer"/>
            </div>
            <p>Stock: {stock+initialQuantity-orderQuantity} left</p>        
        </div>
        <p className="mb-4">Subtotal: {currencyString(price*orderQuantity)}</p>
        <TextButton text="Add to Cart" onClick={submitCart}/>
    </div>
}

export default CartSection;