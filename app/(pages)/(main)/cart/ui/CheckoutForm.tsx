'use client'

import { address, orderResponse } from "@/app/lib/interface";
import { currencyString } from "@/app/lib/string";
import { useMemo, useState } from "react";
import AddressMap from "./AddressMap";
import { TextButton } from "@/app/components/utils";
import SelectAddressModal from "./SelectAddressModal";

const CheckoutForm = ({orders}:{orders:Array<orderResponse>|undefined})=>{
    const totalPrice = useMemo(()=>{
        const subtotals: Array<number> = (orders??[]).map((order:orderResponse)=>{
            return order.price * order.quantity;
        })
        return subtotals.reduce((total:number, subtotal:number)=>{
            return total+subtotal;
        }, 0)
    }, [orders]);
    const [ address, setAddress ] = useState<address>({lat:-6.176518640085772, lng:106.79102171534362, address:"Central Park Mall"})
    const [ showSelectAddress, setShowSelectAddress ] = useState<boolean>(false);
    const findAddress = ()=>setShowSelectAddress(true);
    const selectAddress = ()=>setShowSelectAddress(false);
    const saveAddress = (selectedAddress:address)=>{
        setAddress(selectedAddress);
        selectAddress();
    }
    const deliveryFee = useMemo(()=>{
        return Math.floor(Math.abs(address.lat) * Math.abs(address.lng) * 25);
    }, [address])
    return <section className="col-span-3 p-8">
        <form className="border-2 border-navy-blue rounded-lg p-5">
            <section>
                <h4 className="text-2xl font-semibold mb-5">Location</h4>
                <AddressMap coordinate={address}/>
                <p className="my-4 text-xl">Address: <strong>{address.address}</strong></p>
                <div className="flex-center">
                    <TextButton text="Find Address" onClick={findAddress}/>
                </div>
                <SelectAddressModal show={showSelectAddress} onHideModal={selectAddress} saveAddress={saveAddress}/>
            </section>
            <section className="mt-4">
                <h4 className="text-2xl font-semibold mb-2">Fee</h4>
                <p className="text-xl mb-2"><span>Total Price:</span> <strong>{currencyString(totalPrice)}</strong></p>
                <p className="text-xl mb-2"><span>Delivery Fee:</span> <strong>{currencyString(deliveryFee)}</strong></p>
                <hr className="h-5 border-navy-blue"/>
                <p className="text-xl mb-2"><span>Final Price:</span> <strong>{currencyString(totalPrice + deliveryFee)}</strong></p>
            </section>
            <div className="flex-center mt-5">
                <TextButton text="Checkout" theme="secondary"/>
            </div>
        </form>
    </section>
}

export default CheckoutForm;