"use client"

import {FaEye, FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import {SupplierCard} from "@/components/ui/dashboard/admin/TableCards";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {toast} from "react-toastify";
import {SupplierService} from "@/service";

const Page = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

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
        const fetchSuppliers = () => {
            setLoading(true);
            SupplierService.getAllSuppliers({query})
                .then(response => {
                    setSuppliers(response.data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        };

        fetchSuppliers();
    }, [query]);

    return (
        <div className={`bg-white py-4 p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Suppliers</h1>

            <div className={`mt-4 flex flex-wrap gap-2 justify-between items-center`}>
                <SearchForm/>
                <Link href={`/dashboard/admin/suppliers/add`} className={`add-btn`}>Add Supplier</Link>
            </div>

            <div className={`mt-8`}>
                {loading ? <LoadingSpinner/> : <SuppliersTable suppliers={suppliers} handleDelete={handleDelete}/>}
            </div>
        </div>
    )
}

const SuppliersTable = ({suppliers, handleDelete}) => {
    return (
        suppliers.length === 0 ? (
            <div>
                <p className={`text-center`}>No suppliers found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>S/No</th>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Phone</th>
                            <th scope={`col`} className={`table-heading`}>Address</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {suppliers?.map((supplier, index) => (
                            <tr key={supplier.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{supplier.name}</td>
                                <td className={`table-data`}>{supplier.phone}</td>
                                <td className={`table-data`}>{supplier.address}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Preview`}
                                        className={`edit-btn`}
                                        href={`/dashboard/admin/suppliers/${supplier.id}`}
                                    >
                                        <FaEye/>
                                    </Link>

                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn ml-3`}
                                        href={`/dashboard/admin/suppliers/edit/${supplier.id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        className={`ml-3 delete-btn`} title={`Delete`}
                                        onClick={() => handleDelete(supplier)}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {suppliers.map((supplier, index) => (
                    <div key={index} className={`sm:hidden`}>
                        <SupplierCard supplier={supplier} handleDelete={handleDelete}/>
                    </div>
                ))}
            </>
        )
    )
}

export default Page;