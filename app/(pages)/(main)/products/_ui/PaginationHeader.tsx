'use client'

import SortBy from "@/app/_components/helpers/sort_by";

const PaginationHeader = ({page, total}:{page:number, total:number})=>{
    return (
        <div className="flex justify-between items-center">
            <h4>Showing {total%10!=0?total:`${total-(total%10)}+`} products ({(page*2)-1} - {page*2} out of {total})</h4>
            <SortBy />
        </div>
    )
}

export default PaginationHeader;