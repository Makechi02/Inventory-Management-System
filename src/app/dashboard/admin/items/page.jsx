"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import ItemService from "@/service/ItemService";
import {ItemCard} from "@/components/ui/dashboard/admin/TableCards";

const Page = () => {
    const [items, setItems] = useState([]);

    const handleDelete = (item) => {
        const choice = confirm("Are you sure you want to delete this item?");
        if (choice) deleteItem(item);
    }

    const deleteItem = (item) => {
        ItemService.deleteItem(item._id)
            .then(response => {
                if (response.status === 200) {
                    alert("Item deleted successfully");
                    window.location.reload();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchAllItems = () => {
            ItemService.getAllItems()
                .then(response => setItems(response.data))
                .catch(error => console.error(error));
        };

        fetchAllItems();
    }, []);

    return (
        <div className={`bg-white p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Items</h1>

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/items/add`} className={`add-btn`}>Add Item</Link>
            </div>

            <div className={`mt-4`}>
                {items.length === 0 ? (
                    <p className={`text-center`}>No Items found</p>
                ) : (
                    <>
                        <div className={`overflow-x-auto`}>
                            <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                                <thead className={`bg-gray-50`}>
                                <tr>
                                    <th scope={`col`} className={`table-heading`}>S/No</th>
                                    <th scope={`col`} className={`table-heading`}>Name</th>
                                    <th scope={`col`} className={`table-heading`}>Brand</th>
                                    <th scope={`col`} className={`table-heading`}>Model</th>
                                    <th scope={`col`} className={`table-heading`}>SKU</th>
                                    <th scope={`col`} className={`table-heading`}>Quantity</th>
                                    <th scope={`col`} className={`table-heading`}>Price</th>
                                    <th scope={`col`} className={`table-heading`}>Category</th>
                                    <th scope={`col`} className={`table-heading`}>Actions</th>
                                </tr>
                                </thead>

                                <tbody className={`bg-white divide-y divide-gray-200`}>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className={`table-data`}>{index + 1}</td>
                                        <td className={`table-data`}>{item.name}</td>
                                        <td className={`table-data`}>{item.brand}</td>
                                        <td className={`table-data`}>{item.model}</td>
                                        <td className={`table-data`}>{item.sku}</td>
                                        <td className={`table-data`}>{item.quantity}</td>
                                        <td className={`table-data`}>{item.price}</td>
                                        <td className={`table-data`}>{item.category.name}</td>
                                        <td className={`table-data flex`}>
                                            <Link
                                                title={`Edit`}
                                                className={`edit-btn`}
                                                href={`/dashboard/admin/items/edit/${item._id}`}
                                            >
                                                <FaPen/>
                                            </Link>
                                            <button
                                                title={`Delete`}
                                                className={`ml-3 delete-btn`}
                                                onClick={() => handleDelete(item)}
                                            >
                                                <FaTrashCan/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {items.map((item, index) => (
                            <div key={index} className={`sm:hidden`}>
                                <ItemCard item={item} handleDelete={handleDelete}/>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default Page;