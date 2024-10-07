"use client"

import {FaEye, FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import {CustomerCard} from "@/components/ui/dashboard/admin/TableCards";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {toast} from "react-toastify";
import {CustomerService} from "@/service";

const Page = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const handleDelete = (customer) => {
        showConfirmDialog(
            `Are you sure you want to delete ${customer.name} customer?`,
            () => deleteCustomer(customer)
        );
    }

    const deleteCustomer = (customer) => {
        CustomerService.deleteCustomer(customer.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Customer deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchCustomer = () => {
            setLoading(true);
            CustomerService.getAllCustomers({query})
                .then(response => {
                    setCustomers(response.data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        };

        fetchCustomer();
    }, [query]);

    return (
        <div className={`bg-white py-4 p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Customers</h1>

            <div className={`mt-4 flex flex-wrap gap-2 justify-between items-center`}>
                <SearchForm/>
                <Link href={`/dashboard/admin/customers/add`} className={`add-btn`}>Add Customer</Link>
            </div>

            <div className={`mt-8`}>
                {loading ? <LoadingSpinner/> : <CustomersTable customers={customers} handleDelete={handleDelete} />}
            </div>
        </div>
    )
}

const CustomersTable = ({customers, handleDelete}) => {
    return (
        customers.length === 0 ? (
            <div>
                <p className={`text-center`}>No customers found</p>
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
                        {customers?.map((customer, index) => (
                            <tr key={customer.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{customer.name}</td>
                                <td className={`table-data`}>{customer.phone}</td>
                                <td className={`table-data`}>{customer.address}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Preview`}
                                        className={`edit-btn`}
                                        href={`/dashboard/admin/customers/${customer.id}`}
                                    >
                                        <FaEye/>
                                    </Link>

                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn ml-3`}
                                        href={`/dashboard/admin/customers/edit/${customer.id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        className={`ml-3 delete-btn`} title={`Delete`}
                                        onClick={() => handleDelete(customer)}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {customers.map((customer, index) => (
                    <div key={index} className={`sm:hidden`}>
                        <CustomerCard customer={customer} handleDelete={handleDelete}/>
                    </div>
                ))}
            </>
        )
    )
}

export default Page;