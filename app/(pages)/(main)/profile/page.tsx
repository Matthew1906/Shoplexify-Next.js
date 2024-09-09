import { roboto_bold } from "@/app/lib/font";
import { getUser } from "@/app/services/users";

export const dynamic = 'force-dynamic';

export default async function ProfilePage(){
    const profile = await getUser();
    return <div className={roboto_bold.className}>
        Hello World!
    </div>
}
