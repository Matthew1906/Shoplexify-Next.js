import { roboto_bold, roboto_regular } from "@/app/lib/font";
import { cartResponse } from "@/app/lib/interface";
import { getCart } from "@/app/services/cart";
import CartItem from "./ui/CartItem";
import { revalidatePath } from "next/cache";

export default async function CartPage(){
    const cartContents: Array<cartResponse>|undefined = await getCart();
    revalidatePath('/cart');
    console.log(cartContents);
    return <main className={`${roboto_regular.className} p-10 grid grid-cols-7`}>
        <section className="col-span-5">
            <h2 className={`${roboto_bold.className} text-3xl mb-4`}>Cart</h2>
            {cartContents?.map((cartItem:cartResponse)=>{
                return <CartItem item={cartItem} />
            })}
        </section>
        <section className="col-span-2">

        </section>
    </main>
}