"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SupplierService from "@/service/SupplierService";
import {toast} from "react-toastify";

const EditSupplierForm = ({supplierID, userID}) => {
    const [supplier, setSupplier] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleEditSupplier = (e) => {
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

        const updatedSupplier = {name, phone, address, updatedBy: userID};
        updateSupplier(updatedSupplier);
    }

    const updateSupplier = (data) => {
        SupplierService.updateSupplier(supplierID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Supplier updated successfully');
                    router.back();
                }
            });
    }

    useEffect(() => {
        const fetchSupplierById =  () => {
            SupplierService.getSupplierById(supplierID)
                .then(response => setSupplier(response?.data[0]))
                .catch(error => console.error(error));
        }

        fetchSupplierById();
    }, []);

    useEffect(() => {
        setName(supplier.name);
        setPhone(supplier.phone);
        setAddress(supplier.address);
    }, [supplier]);

    return (
        supplier.name ? (
            <form className={`flex flex-col gap-2`} onSubmit={handleEditSupplier}>
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

                <button className={`dashboard-submit-btn`} type={`submit`}>Save Supplier</button>
            </form>
        ) : (
            <p>Loading...</p>
        )
    )
}

export default EditSupplierForm;