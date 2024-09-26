"use client"

import BackBtn from "@/components/ui/dashboard/BackBtn";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import SupplierService from "@/service/SupplierService";
import {SubmitBtn} from "@/components/ui/dashboard/Buttons";

const Page = ({params}) => {
    const supplierID = params.id;
    const [loading, setLoading] = useState(false);

    const [supplier, setSupplier] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleEditSupplier = (e) => {
        e.preventDefault();
        setLoading(true);

        if (name === '') {
            toast.error("Supplier name is blank");
            setLoading(false);
            return;
        }

        if (phone === '') {
            toast.error("Supplier contact is blank");
            setLoading(false);
            return;
        }

        if (address === '') {
            toast.error("Supplier address is blank");
            setLoading(false);
            return;
        }

        const updatedSupplier = {name, phone, address};
        updateSupplier(updatedSupplier);
    }

    const updateSupplier = (data) => {
        SupplierService.updateSupplier(supplierID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Supplier updated successfully');
                    setLoading(false);
                    router.back();
                }
            }).catch(error => {
                if (error.status === 400 || error.status === 409) {
                    toast.error(error.response.data);
                } else {
                    console.error(error);
                    toast.error("Failed to update supplier. Please try again!");
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        const fetchSupplierById =  () => {
            SupplierService.getSupplierById(supplierID)
                .then(response => setSupplier(response?.data))
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
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit Supplier</h1>

                <div className={`mt-4`}>
                    {supplier.name ? (
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

                            <SubmitBtn loading={loading} text={`Save Supplier`} />
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;