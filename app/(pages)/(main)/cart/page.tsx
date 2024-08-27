import { roboto_bold, roboto_regular } from "@/app/lib/font";
import { orderResponse } from "@/app/lib/interface";
import { getOrders } from "@/app/services/orders";
import { revalidatePath } from "next/cache";
import OrderItem from "./ui/OrderItem";

export default async function CartPage(){
    const cartContents: Array<orderResponse>|undefined = await getOrders();
    revalidatePath('/cart');
    return <main className={`${roboto_regular.className} p-10 grid grid-cols-7`}>
        <section className="col-span-5">
            <h2 className={`${roboto_bold.className} text-3xl mb-4`}>Cart</h2>
            {cartContents?.map((cartItem:orderResponse)=>{
                return <OrderItem key={cartItem.slug} item={cartItem} />
            })}
        </section>
        <section className="col-span-2">

        </section>
    </main>
}