import { roboto_regular } from "@/app/lib/font";
import { Chart, Metrics, OrderTable, ProductList } from "./ui";
import { transactionResponse } from "@/app/lib/interface";
import { getTransactions } from "@/app/services/transactions";
import { Suspense } from "react";

// TODO: Make sure only admin can see this page

export default async function AdminPage(){
    // Orders -> orders table containing all orders and for chart
    const orders: Array<transactionResponse> | undefined = await getTransactions();
    // Top products can change the dropdown for different months in a year -> dropdown will change the search params?
    // Metrics -> get the basic metrics -> for Metric
    return <main className={`${roboto_regular.className} px-10 py-5`}>
        <Suspense fallback={<p>Loading..</p>}>
            <Metrics />
            <div className="my-4 grid grid-cols-2 gap-5">
                <Chart />
                <ProductList />
            </div>
            <OrderTable orders={orders}/>
        </Suspense>
    </main>
}
