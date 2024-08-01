"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import {SupplierCard} from "@/components/ui/dashboard/admin/TableCards";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import DateUtil from "@/utils/dateUtil";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SupplierService from "@/service/SupplierService";

const Page = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const handleDelete = (supplier) => {
        Swal.fire({
            title: `Are you sure you want to delete ${supplier.name} supplier?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) deleteSupplier(supplier);
        });
    }

    const deleteSupplier = (supplier) => {
        SupplierService.deleteSupplier(supplier._id)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Supplier deleted successfully", "", "success")
                        .then(() => window.location.reload());
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

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/suppliers/add`} className={`add-btn`}>Add Supplier</Link>
            </div>

            <div className={`mt-4`}>
                <SearchForm/>
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
                            <th scope={`col`} className={`table-heading`}>Added By</th>
                            <th scope={`col`} className={`table-heading`}>Added At</th>
                            <th scope={`col`} className={`table-heading`}>Updated By</th>
                            <th scope={`col`} className={`table-heading`}>Updated At</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {suppliers?.map((supplier, index) => (
                            <tr key={supplier._id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{supplier.name}</td>
                                <td className={`table-data`}>{supplier.phone}</td>
                                <td className={`table-data`}>{supplier.address}</td>
                                <td className={`table-data`}>{supplier.addedBy.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(supplier.addedAt)}</td>
                                <td className={`table-data`}>{supplier?.updatedBy?.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(supplier.updatedAt)}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn`}
                                        href={`/dashboard/admin/suppliers/edit/${supplier._id}`}
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