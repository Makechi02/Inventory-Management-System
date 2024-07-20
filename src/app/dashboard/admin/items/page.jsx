"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import ItemService from "@/service/ItemService";

const Page = () => {
    const[items, setItems] = useState([]);

    const handleDelete = (item) => {
        const choice = confirm("Are you sure you want to delete this item?");
        if (choice) deleteItem(item);
    }

    const deleteItem = (item) => {
        ItemService.deleteItem(item._id)
            .then(response => {
                if (response.status === 200) {
                    alert("Item deleted successfully");
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
        <div className={`bg-white p-4 rounded-lg`}>
            <h1 className={`page-heading`}>Items</h1>

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/items/add`} className={`add-btn`}>Add Item</Link>
            </div>

            <div className={`mt-4`}>
                {items.length === 0 ? (
                    <p className={`text-center`}>No Items found</p>
                ) : (
                    <div className={`overflow-x-auto`}>
                        <table className={`min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden`}>
                            <thead className={`bg-gray-300`}>
                            <tr>
                                <th className={`py-2`}>S/No</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>SKU</th>
                                <th>Quantity</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className={`text-center`}>{index + 1}</td>
                                    <td className={`text-center`}>{item.name}</td>
                                    <td className={`text-center`}>{item.brand}</td>
                                    <td className={`text-center`}>{item.model}</td>
                                    <td className={`text-center`}>{item.sku}</td>
                                    <td className={`text-center`}>{item.quantity}</td>
                                    <td className={`text-center capitalize`}>{item.category.name}</td>
                                    <td className={`flex justify-center gap-2 py-2`}>
                                        <Link
                                            title={`Edit`}
                                            className={`p-2 bg-[#333333] text-white rounded-lg`}
                                            href={`/dashboard/admin/items/edit/${item._id}`}
                                        >
                                            <FaPen/>
                                        </Link>
                                        <button
                                            title={`Delete`}
                                            className={`bg-red-500 rounded-lg p-2 text-white`}
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
                )}
            </div>
        </div>
    )
}

export default Page;