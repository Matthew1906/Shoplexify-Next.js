import { Metadata } from "next";
import { roboto_bold, roboto_regular } from "@/app/lib/font";
import { orderResponse } from "@/app/lib/interface";
import { getOrders } from "@/app/services/orders";
import { CheckoutForm, ClearCartButton, OrderItem } from "./ui";

export const metadata: Metadata = {
    title:"My Cart - Shoplexify"
}

export default async function CartPage(){
    const cartContents: Array<orderResponse>|undefined = await getOrders();
    return <main className={`${roboto_regular.className} py-10 px-20 grid grid-cols-8`}>
        <section className="col-span-5">
            <div className="flex grow justify-between items-center gap-5 mb-5">
                <h2 className={`${roboto_bold.className} text-4xl`}>Cart</h2>
                {(cartContents??[]).length>0 && <ClearCartButton />}
            </div>
            {(cartContents??[]).length<=0 && <p className="text-2xl">No items on cart!</p>}
            {cartContents?.map((cartItem:orderResponse)=>{
                return <OrderItem key={cartItem.slug} item={cartItem} />
            })}
        </section>
        { (cartContents??[]).length>0 && <CheckoutForm orders={cartContents}/>}
    </main>
}