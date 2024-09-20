import { Metadata } from "next";
import { notFound } from "next/navigation";
import { roboto_bold, roboto_regular } from "@/app/lib/font";
import { transactionHistoryDetails, transactionHistoryResponse } from "@/app/lib/interface";
import { dateString } from "@/app/lib/string";
import { getTransactionHistory } from "@/app/services/transactions";
import { TransactionItem, TransactionSummary } from "./ui";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function generateMetadata(
    {params}:{params:{id:number}}
  ): Promise<Metadata> {
    // read route params
    const id = params.id
      
    return {
      title: `Transaction ${id} - Shoplexify`,
    }
  }

export default async function TransactionHistoryPage({params}:{params:{id:number}}){
    const id = params.id;
    const session = await getServerSession(authOptions);
    const transactionHistory: transactionHistoryResponse|undefined = await getTransactionHistory(id);
    if(!transactionHistory?.status){
        return notFound();
    }
    return <main className={`${roboto_regular.className} py-10 px-20 grid grid-cols-8`}>
        <section className="col-span-5">
            <div className="flex grow justify-between items-center gap-5 mb-8">
                <h2 className={`${roboto_bold.className} text-4xl`}>
                    Order {transactionHistory?.id} - {dateString(new Date(transactionHistory?.date??""))}
                </h2>
            </div>
            {transactionHistory?.details?.map((cartItem:transactionHistoryDetails)=>{
                return <TransactionItem key={cartItem.slug} item={cartItem} />
            })}
        </section>
        <TransactionSummary 
            details={transactionHistory?.details} 
            deliveryFee={transactionHistory?.delivery_cost} 
            addressString={transactionHistory?.address}
            status={transactionHistory?.transaction_status}
            id={id}
            isAdmin={session?.role=='admin'}
        />
    </main>
}