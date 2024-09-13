"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import SupplierService from "@/service/SupplierService";
import {toast} from "react-toastify";

const AddSupplierForm = ({userID}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleAddSupplier = async (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Supplier name is blank");
            return;
        }

        if (phone === '') {
            toast.error("Supplier contact is blank");
            return;
        }

        if (address === '') {
            toast.error("Supplier address is blank");
            return;
        }

        try {
            const newSupplier = {name, phone, address, addedBy: userID, updatedBy: userID};
            const response = await SupplierService.addSupplier(newSupplier);
            if (response.status === 201) {
                toast.success('New Supplier added successfully');
                router.back();
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={`flex flex-col gap-2`} onSubmit={handleAddSupplier}>
            <div className={`grid sm:grid-cols-2 gap-4`}>
                <div className={`input-box`}>
                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                    <input
                        type={`text`}
                        id={`name`}
                        value={name}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                        onChange={event => setName(event.target.value)}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`phone`} className={`dashboard-label`}>Phone:</label>
                    <input
                        type={`text`}
                        id={`phone`}
                        value={phone}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                        onChange={event => setPhone(event.target.value)}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`address`} className={`dashboard-label`}>Address:</label>
                    <input
                        type={`text`}
                        id={`address`}
                        value={address}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                        onChange={event => setAddress(event.target.value)}
                    />
                </div>
            </div>

            <button className={`dashboard-submit-btn`} type={`submit`}>Add Supplier</button>
        </form>
    )
}

export default AddSupplierForm;