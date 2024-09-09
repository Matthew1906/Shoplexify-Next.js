import { authOptions } from "@/app/lib/auth";
import { roboto_bold, roboto_regular } from "@/app/lib/font";
import { transactionResponse } from "@/app/lib/interface";
import { getTransactions } from "@/app/services/transactions";
import { getServerSession } from "next-auth";
import TransactionCard from "./ui/TransactionCard";
import Image from "next/image";
import ProfileForm from "./ui/ProfileForm";
import { dateString } from "@/app/lib/string";

export const dynamic = 'force-dynamic';

export default async function ProfilePage(){
    const profile = await getServerSession(authOptions);
    const transactions: Array<transactionResponse> | undefined = await getTransactions();
    return <main className={`grid grid-cols-2 gap-5 p-10 ${roboto_regular.className}`}>
        <section id="profile-info">
            <div className="border-navy-blue border-2 rounded-lg p-8 flex items-center gap-5">
                <Image
                    src={"https://ui-avatars.com/api/?background=random&rounded=true&size=256&name="+profile?.name?.split(" ").join("+")}
                    alt={"Profile Image of " + profile?.name}
                    width={100}
                    height={100}
                />
                <div className="text-xl col-span-2">
                    <h5 className="font-bold mb-2">{profile?.name}</h5>
                    <p className="mb-2 underline">{profile?.email}</p>
                    {profile?.dob!=="None" && <p className="font-semibold">{dateString(new Date(profile?.dob??""))}</p>}
                </div>
            </div>
            <ProfileForm dob={new Date(profile?.dob??"")} />
        </section>
        <section id="transactions" className="border-navy-blue border-2 rounded-lg p-5">
            <h4 className={`mb-4 text-2xl ${roboto_bold.className}`}>My Orders</h4>
            {(transactions??[]).map((transaction:transactionResponse)=>{
                return <TransactionCard key={transaction.id} transaction={transaction} />
            })}
        </section>
    </main>
}
