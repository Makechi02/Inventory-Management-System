"use client"

import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {useEffect, useState} from "react";
import ItemService from "@/service/ItemService";
import DateUtil from "@/utils/dateUtil";
import {FaTrashCan} from "react-icons/fa6";
import Swal from "sweetalert2";
import BackBtn from "@/components/ui/dashboard/BackBtn";

const Page = ({params}) => {
    const [item, setItem] = useState({});

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure you want to delete this item?",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) deleteItem(item);
        });
    };

    const deleteItem = (item) => {
        ItemService.deleteItem(item._id)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Item deleted successfully", "", "success")
                        .then(() => window.location.reload());
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        const fetchItemByID = () => {
            ItemService.getItemById(params.id)
                .then(response => {
                    console.log(response.data);
                    setItem(response.data[0]);
                })
                .catch(error => console.error(error));
        }

        fetchItemByID();
    }, []);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Item Preview</h1>

                <div className={`mt-4 flex flex-wrap justify-end items-center gap-4`}>
                    <Link
                        title={`Edit`}
                        className={`edit-btn flex items-center gap-2`}
                        href={`/dashboard/admin/items/edit/${item._id}`}
                    >
                        <FaPen/>
                        Edit Item
                    </Link>

                    <button
                        title={`Delete`}
                        className={`ml-3 delete-btn flex items-center gap-2`}
                        onClick={() => handleDelete(item)}
                    >
                        <FaTrashCan/> Delete Item
                    </button>
                </div>

                <div className={`mt-4`}>
                    {item.name ? (
                        <div className={`flex flex-col gap-3`}>
                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
                                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`brand`} className={`dashboard-label`}>Brand:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.brand}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`model`} className={`dashboard-label`}>Model:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.model}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`quantity`} className={`dashboard-label`}>Quantity:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.quantity}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`price`} className={`dashboard-label`}>Price:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.price}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Category:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.category?.name ? item.category.name : 'unknown'}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Created At:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(item.createdAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Created By:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.createdBy.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Updated At:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(item.updatedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Updated By:</label>
                                    <div className={`dashboard-input`}>
                                        <p>{item.updatedBy.name}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;