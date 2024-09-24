"use client"

import BackBtn from "@/components/ui/dashboard/BackBtn";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import SupplierService from "@/service/SupplierService";

const Page = () => {
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
            const newSupplier = {name, phone, address};
            const response = await SupplierService.addSupplier(newSupplier);
            if (response.status === 201) {
                toast.success('New Supplier added successfully');
                router.back();
            }
        } catch (e) {
            if (e.status === 409) {
                toast.error(e.response.data.error);
            } else {
                console.error(e);
            }
        }
    }

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add supplier</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-2`} onSubmit={handleAddSupplier}>
                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    value={name}
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
                </div>
            </div>
        </section>
    )
}

export default Page;