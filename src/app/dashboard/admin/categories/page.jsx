"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";

const Page = () => {
    const[categories,setCategories] = useState([]);

    const handleDelete = (category) => {
        const choice = confirm(`Are you sure you want to delete ${category.name} category?`);
        if (choice) deleteCategory(category);
    }

    const deleteCategory = (category) => {
        CategoryService.deleteCategory(category._id)
            .then(response => {
                if (response.status === 200) {
                    alert("Category deleted successfully");
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchCategories = () => {
            CategoryService.getAllCategories()
                .then(response => setCategories(response.data))
                .catch(error => console.error(error));
        };

        fetchCategories();
    }, []);

    return (
        <div className={`bg-white p-2 py-4 sm:p-4 rounded-lg`}>
            <h1 className={`page-heading`}>Categories</h1>

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/categories/add`} className={`add-btn`}>Add Category</Link>
            </div>

            <div className={`mt-4`}>
                {categories.length === 0 ? (
                    <div>
                        <p className={`text-center`}>No categories found</p>
                    </div>
                ) : (
                    <table className={`w-full rounded-lg overflow-hidden`}>
                        <thead className={`bg-gray-300`}>
                        <tr>
                            <th className={`py-2`}>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {categories?.map((category) => (
                            <tr key={category._id}>
                                <td className={`text-center capitalize`}>{category.name}</td>
                                <td className={`flex justify-center gap-2 py-2`}>
                                    <Link
                                        title={`Edit`}
                                        className={`p-2 bg-[#333333] text-white rounded-lg`}
                                        href={`/dashboard/admin/categories/edit/${category._id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        className={`bg-red-500 rounded-lg p-2 text-white`} title={`Delete`}
                                        onClick={() => handleDelete(category)}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Page;