"use client"

import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {useEffect, useState} from "react";
import DateUtil from "@/utils/dateUtil";
import {FaTrashCan} from "react-icons/fa6";
import BackBtn from "@/components/ui/dashboard/BackBtn";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import SupplierService from "@/service/SupplierService";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const Page = ({params}) => {
    const [supplier, setSupplier] = useState({});
    const router = useRouter();

    const handleDelete = (supplier) => {
        showConfirmDialog(
            `Are you sure you want to delete ${supplier.name} supplier?`,
            () => deleteSupplier(supplier)
        );
    }

    const deleteSupplier = (supplier) => {
        SupplierService.deleteSupplier(supplier.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Supplier deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchSupplierByID = () => {
            SupplierService.getSupplierById(params.id)
                .then(response => setSupplier(response.data))
                .catch(error => console.error(error));
        }

        fetchSupplierByID();
    }, []);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Supplier Preview</h1>

                <div className={`mt-4 flex flex-wrap justify-end items-center gap-4`}>
                    <Link
                        title={`Edit`}
                        className={`edit-btn flex items-center gap-2`}
                        href={`/dashboard/admin/suppliers/edit/${supplier.id}`}
                    >
                        <FaPen/> Edit Supplier
                    </Link>

                    <button
                        title={`Delete`}
                        className={`ml-3 delete-btn flex items-center gap-2`}
                        onClick={() => handleDelete(supplier)}
                    >
                        <FaTrashCan/> Delete Supplier
                    </button>
                </div>

                <div className={`mt-4`}>
                    {supplier.name ? (
                        <div className={`flex flex-col gap-3`}>
                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Name:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{supplier.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Phone:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{supplier.phone}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Address:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{supplier.address}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Added At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(supplier.addedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Added By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{supplier?.addedBy?.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(supplier.updatedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{supplier?.updatedBy?.name}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <LoadingSpinner/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;