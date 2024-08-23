import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { roboto_bold } from "@/app/_lib/font";

const pageLength:number = parseInt(process.env.PAGE_LENGTH??"5");

const PaginationItem = (
    {children}:{children:React.ReactNode}
)=>{
    return (
        <span className="text-navy-blue font-semibold py-2 px-4 text-lg cursor-pointer">
            {children}
        </span>
    )
}

const PaginationBar = ({page, total}:{page:number, total:number})=>{
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const prevPage = (event:MouseEvent)=>{
        event.preventDefault();
        const editableParams = new URLSearchParams(searchParams);
        editableParams.set("page", (page-1).toString());
        router.push(`${pathname}?${editableParams.toString()}`);
        router.refresh();
    }
    // const movePage = (page:number)=>{
    //     const editableParams = new URLSearchParams(searchParams);
    //     editableParams.set("page", (page).toString());
    //     router.push(`${pathname}?${editableParams.toString()}`);
    //     router.refresh();
    // }
    const nextPage = (event:MouseEvent)=>{
        event.preventDefault();
        const editableParams = new URLSearchParams(searchParams);
        editableParams.set("page", (page+1).toString());
        router.push(`${pathname}?${editableParams.toString()}`);
        router.refresh();
    }
    return (
        <div className={`${roboto_bold} flex-center gap-2`}>   
            {/* {page>1 && <BiFirstPage onClick={prevPage} className="w-8 h-8 cursor-pointer" />} */}
            {page>1 && <MdNavigateBefore onClick={prevPage} className="w-8 h-8 cursor-pointer"/>}
            <PaginationItem>{page}</PaginationItem>
            {page*pageLength<total && <MdNavigateNext onClick={nextPage} className="w-8 h-8 cursor-pointer" />}
            {/* {page*pageLength<total && <BiLastPage onClick={nextPage} className="w-8 h-8 cursor-pointer" />} */}
        </div>
    )
}

export default PaginationBar;