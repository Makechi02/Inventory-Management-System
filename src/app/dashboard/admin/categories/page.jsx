"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";
import {CategoryCard} from "@/components/ui/dashboard/admin/TableCards";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {useSearchParams} from "next/navigation";
import Swal from "sweetalert2";
import DateUtil from "@/utils/dateUtil";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const handleDelete = (category) => {
        Swal.fire({
            title: `Are you sure you want to delete ${category.name} category?`,
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) deleteCategory(category);
        });
    }

    const deleteCategory = (category) => {
        CategoryService.deleteCategory(category._id)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Category deleted successfully", "", "success")
                        .then(() => window.location.reload());
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchCategories = () => {
            setLoading(true);
            CategoryService.getAllCategories({query})
                .then(response => {
                    setCategories(response.data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        };

        fetchCategories();
    }, [query]);

    return (
        <div className={`bg-white py-4 p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Categories</h1>

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/categories/add`} className={`add-btn`}>Add Category</Link>
            </div>

            <div className={`mt-4`}>
                <SearchForm/>
            </div>

            <div className={`mt-8`}>
                {loading ? <LoadingSpinner/> : <CategoriesTable categories={categories} handleDelete={handleDelete}/>}
            </div>
        </div>
    )
}

const CategoriesTable = ({categories, handleDelete}) => {
    return (
        categories.length === 0 ? (
            <div>
                <p className={`text-center`}>No categories found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>S/No</th>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Created By</th>
                            <th scope={`col`} className={`table-heading`}>Created At</th>
                            <th scope={`col`} className={`table-heading`}>Updated By</th>
                            <th scope={`col`} className={`table-heading`}>Updated At</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {categories?.map((category, index) => (
                            <tr key={category._id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{category.name}</td>
                                <td className={`table-data`}>{category.createdBy.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(category.createdAt)}</td>
                                <td className={`table-data`}>{category?.updatedBy?.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(category.updatedAt)}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn`}
                                        href={`/dashboard/admin/categories/edit/${category._id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        className={`ml-3 delete-btn`} title={`Delete`}
                                        onClick={() => handleDelete(category)}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {categories.map((category, index) => (
                    <div key={index} className={`sm:hidden`}>
                        <CategoryCard category={category} handleDelete={handleDelete}/>
                    </div>
                ))}
            </>
        )
    )
}

export default Page;