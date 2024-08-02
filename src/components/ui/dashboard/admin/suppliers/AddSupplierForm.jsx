"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SupplierService from "@/service/SupplierService";
import {showSuccessDialog} from "@/utils/sweetalertUtil";

const AddSupplierForm = ({userID}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        setErrorMessage("");
    }, [name, phone, address]);

    const handleAddSupplier = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Supplier name is blank");
            return;
        }

        if (phone === '') {
            setErrorMessage("Supplier contact is blank");
            return;
        }

        if (address === '') {
            setErrorMessage("Supplier address is blank");
            return;
        }

        try {
            const newSupplier = {name, phone, address, addedBy: userID, updatedBy: userID};
            const response = await SupplierService.addSupplier(newSupplier);
            if (response.status === 201) {
                showSuccessDialog('New Supplier added successfully', () => router.back());
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={`flex flex-col gap-2`} onSubmit={handleAddSupplier}>
            <p className={`text-red-500`}>{errorMessage && errorMessage}</p>
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

            <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
        </form>
    )
}

export default AddSupplierForm;