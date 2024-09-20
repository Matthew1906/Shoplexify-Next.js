import { Metadata } from "next";
import { Suspense } from "react";
import { roboto_regular } from "@/app/lib/font";
import { adminMetric, adminOrderMetrics, adminOrdersResponse, adminSearchParams, Product } from "@/app/lib/interface";
import { getMetrics, getOrderMetrics, getTopProducts, getTransactions } from "@/app/services/admin";
import { Chart, Metrics, OrderTable, ProductList } from "./ui";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title:"Admin Dashboard - Shoplexify"
}

export default async function AdminPage({searchParams}:{searchParams?:adminSearchParams}){
    const session = await getServerSession(authOptions);
    if(session?.role != 'admin'){
        return notFound();
    }
    // Orders -> orders table containing all orders and for chart
    const orders: adminOrdersResponse | undefined = await getTransactions(searchParams??null);
    const orderMetrics: adminOrderMetrics | undefined = await getOrderMetrics();
    // Top products can change the dropdown for different months in a year -> dropdown will change the search params?
    const topProducts: Array<Product> | undefined = await getTopProducts(searchParams??null);
    // Metrics -> get the basic metrics -> for Metric
    const metrics: adminMetric | undefined = await getMetrics();
    return <main className={`${roboto_regular.className} px-10 py-5`}>
        <Suspense fallback={<p>Loading..</p>}>
            <Metrics metrics={metrics}/>
            <div className="my-10 grid grid-cols-2 gap-5">
                <Chart metrics={orderMetrics}/>
                <ProductList products={topProducts} />
            </div>
            <OrderTable orders={orders}/>
        </Suspense>
    </main>
}
