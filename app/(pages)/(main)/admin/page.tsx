import { Suspense } from "react";
import { roboto_regular } from "@/app/lib/font";
import { adminMetric, adminSearchParams, adminTransactions, Product, transactionResponse } from "@/app/lib/interface";
import { getMetrics, getTopProducts, getTransactions } from "@/app/services/admin";
import { Chart, Metrics, OrderTable, ProductList } from "./ui";

export const dynamic = 'force-dynamic';

// TODO: Make sure only admin can see this page

export default async function AdminPage({searchParams}:{searchParams?:adminSearchParams}){
    // Orders -> orders table containing all orders and for chart
    const orders: Array<adminTransactions> | undefined = await getTransactions();
    // Top products can change the dropdown for different months in a year -> dropdown will change the search params?
    const topProducts: Array<Product> | undefined = await getTopProducts(searchParams??null);
    // Metrics -> get the basic metrics -> for Metric
    const metrics: adminMetric | undefined = await getMetrics();
    return <main className={`${roboto_regular.className} px-10 py-5`}>
        <Suspense fallback={<p>Loading..</p>}>
            <Metrics metrics={metrics}/>
            <div className="my-10 grid grid-cols-2 gap-5">
                <Chart />
                <ProductList products={topProducts} />
            </div>
            <OrderTable orders={orders}/>
        </Suspense>
    </main>
}
