import BaseModal from "@/app/components/BaseModal"
import { FormEvent, useState } from "react";
import { roboto_semibold } from "@/app/lib/font";
import { TextButton } from "@/app/components/utils";
import { reviews } from "@prisma/client";
import RatingInput from "./RatingInput";
import { createReview } from "@/app/services/reviews";
import { useRouter } from "next/navigation";

const ReviewModal = (
    { slug, show, onHideModal, review } : 
    { slug:string, show:boolean, onHideModal: ()=>void, review:reviews|null }
)=>{
    const [ rating, setRating ] = useState<number>(review?.rating??0);
    const [ isError, setIsError ] = useState<boolean>(false);
    const router = useRouter();
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
            }
        })
    }
    return (
        <BaseModal show={show} onHideModal={onHideModal} className="w-5/12 h-auto">
            <form onSubmit={handleSubmit}>
                <h6 className="font-semibold text-xl mb-5 text-center">Product Review Form</h6>
                { isError && <p className={`${roboto_semibold.className} text-red px-1`}>Something went wrong!</p>}
                <div className="w-full mb-4">
                    <label htmlFor="body" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Review</label>
                    <RatingInput rating={rating} onChange={setRating}/>
                </div>
                <div className="w-full">
                    <label htmlFor="body" className={`block mb-2 ${roboto_semibold.className} text-lg`}>Review</label>
                    <textarea 
                        required name="body" rows={5} 
                        className="mb-2 border border-black border-opacity-75 rounded-md w-full text-lg px-2 py-1"
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