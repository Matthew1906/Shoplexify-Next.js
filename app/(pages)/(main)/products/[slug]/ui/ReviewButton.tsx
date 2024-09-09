'use client'

import { TextButton } from "@/app/components/buttons";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import { reviews } from "@prisma/client";

const ReviewButton = ({slug, review}:{slug:string, review?:reviews|null})=>{
    const [ showReviewForm, setShowReviewForm ] = useState<boolean>(false);
    const openForm = ()=>setShowReviewForm(true);
    const closeForm = ()=>setShowReviewForm(false);
    return <>
        <TextButton text={`${review?"Edit":"Add"} Review`} onClick={openForm}/>
        <ReviewModal slug={slug} show={showReviewForm} onHideModal={closeForm} review={review??null}/>
    </>
}

export default ReviewButton;
