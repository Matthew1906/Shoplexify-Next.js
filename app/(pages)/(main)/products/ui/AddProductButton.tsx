'use client'

import { TextButton } from "@/app/components/buttons"
import { useState } from "react";
import ProductModal from "./ProductModal";

const AddProductButton = ()=>{
    const [ showProductForm, setShowProductForm ] = useState<boolean>(false);
    const openForm = ()=>setShowProductForm(true);
    const closeForm = ()=>setShowProductForm(false);
    return <>
        <div className="flex self-stretch my-4">
            <TextButton text='Add Product' onClick={openForm} className="flex-grow"/>
            <ProductModal onHideModal={closeForm} product={null} show={showProductForm} />
        </div>
    </>
}

export default AddProductButton;