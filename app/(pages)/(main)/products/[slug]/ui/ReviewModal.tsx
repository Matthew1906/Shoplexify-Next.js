'use client'

import RatingInput from "./RatingInput";
import { useRouter } from "next/navigation";
import { reviews } from "@prisma/client";
import { FormEvent, useRef, useState } from "react";
import { TextButton } from "@/app/components/buttons";
import { roboto_semibold } from "@/app/lib/font";
import { BaseModal } from "@/app/(pages)/(main)/ui";
import { createReview } from "@/app/services/reviews";

const ReviewModal = (
    { slug, show, onHideModal, review } : 
    { slug:string, show:boolean, onHideModal: ()=>void, review:reviews|null }
)=>{
    const [ rating, setRating ] = useState<number>(review?.rating??0);
    const [ isError, setIsError ] = useState<boolean>(false);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement|null>(null);
    const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.set('rating', rating.toString());
        formData.set('slug', slug);
        createReview(formData).then(res=>{
            if(res.status){
                router.refresh();
                onHideModal();
            } else {
                setIsError(true)
                formRef?.current?.reset();
            }
        })
    }
    return (
        <BaseModal show={show} onHideModal={onHideModal} className="w-9/12 lg:w-5/12 h-auto">
            <form onSubmit={handleSubmit} ref={formRef}>
                <h6 className="font-semibold text-base lg:text-xl mb-5 text-center">Product Review Form</h6>
                { isError && <p className={`${roboto_semibold.className} text-red px-1`}>Something went wrong!</p>}
                <div className="w-full mb-4">
                    <label htmlFor="body" className={`block mb-2 ${roboto_semibold.className} text-sm lg:text-lg`}>Review</label>
                    <RatingInput rating={rating} onChange={setRating}/>
                </div>
                <div className="w-full">
                    <label htmlFor="body" className={`block mb-2 ${roboto_semibold.className} text-sm lg:text-lg`}>Review</label>
                    <textarea 
                        required name="body" rows={5} 
                        className="mb-2 border border-black border-opacity-75 rounded-md w-full text-sm lg:text-lg px-2 py-1"
                        defaultValue={review?.review??""}
                    />
                </div>
                <div className="flex justify-end">
                <TextButton text="Save Review" isForm/>
            </div>
            </form>
            
        </BaseModal>
    )
}

export default ReviewModal;