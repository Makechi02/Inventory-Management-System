"use client"

import {FaEye, FaFilter, FaPen} from 'react-icons/fa';
import {FaTrashCan} from 'react-icons/fa6';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import ItemService from '@/service/ItemService';
import {ItemCard} from '@/components/ui/dashboard/admin/TableCards';
import SearchForm from '@/components/ui/dashboard/admin/SearchForm';
import FiltersModal from '@/components/ui/dashboard/admin/FiltersModal';
import CategoryService from '@/service/CategoryService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Pagination from "@/components/ui/dashboard/admin/items/Pagination";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {toast} from "react-toastify";

const Page = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const router = useRouter();

    const toggleFiltersVisibility = () => {
        setIsFiltersVisible(prevState => !prevState);
    };

    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const handleDelete = (item) => {
        showConfirmDialog(
            `Are you sure you want to delete this item?`,
            () => deleteItem(item)
        );
    };

    const deleteItem = (item) => {
        ItemService.deleteItem(item._id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Item deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    };

    const fetchAllItems = () => {
        setLoading(true);
        ItemService.getAllItems({query, category, minPrice, maxPrice, page, limit})
            .then(response => {
                setItems(response.data.items);
                setPage(response.data.pagination.page);
                setTotalPages(response.data.pagination.totalPages);
                setLimit(response.data.pagination.limit);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const fetchAllCategories = () => {
        CategoryService.getAllCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchAllItems();
        fetchAllCategories();
    }, [query, category, minPrice, maxPrice, page, limit]);

    return (
        <div>
            <FiltersModal
                categories={categories}
                isVisible={isFiltersVisible}
                toggleVisibility={toggleFiltersVisibility}
            />

            <div className="bg-white p-4 rounded-lg shadow-lg">
                <h1 className="page-heading">Items</h1>

                <div className="mt-4 flex w-full justify-end">
                    <Link href={`/dashboard/admin/items/add`} className="add-btn">Add Item</Link>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button
                        onClick={toggleFiltersVisibility}
                        title="Apply filters"
                        className="flex gap-2 items-center bg-blue-600 hover:bg-blue-900 p-2 rounded-lg text-gray-100"
                    >
                        <FaFilter/>
                        Filters
                    </button>
                    <SearchForm/>
                </div>

                <div className="mt-8">
                    {loading ? (
                        <LoadingSpinner/>
                    ) : (
                        <>
                            <ItemsTable
                                items={items}
                                handleDelete={handleDelete}
                                page={page}
                                totalPages={totalPages}
                                setPage={setPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const ItemsTable = ({items, handleDelete, page, totalPages, setPage}) => {
    return (
        items.length === 0 ? (
            <p className="text-center">No Items found</p>
        ) : (
            <div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="table-heading">S/No</th>
                            <th scope="col" className="table-heading">Name</th>
                            <th scope="col" className="table-heading">Brand</th>
                            <th scope="col" className="table-heading">Model</th>
                            <th scope="col" className="table-heading">SKU</th>
                            <th scope="col" className="table-heading">Quantity</th>
                            <th scope="col" className="table-heading">Price</th>
                            <th scope="col" className="table-heading">Category</th>
                            <th scope="col" className="table-heading">Actions</th>
                        </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td className="table-data">{index + 1}</td>
                                <td className="table-data">{item.name}</td>
                                <td className="table-data">{item.brand}</td>
                                <td className="table-data">{item.model}</td>
                                <td className="table-data">{item.sku}</td>
                                <td className="table-data">{item.quantity}</td>
                                <td className="table-data">{item.price}</td>
                                <td className="table-data">{item.category?.name || 'Unknown'}</td>
                                <td className="table-data flex">
                                    <Link
                                        title="View"
                                        className="edit-btn"
                                        href={`/dashboard/admin/items/${item._id}`}
                                    >
                                        <FaEye/>
                                    </Link>
                                    <Link
                                        title="Edit"
                                        className="edit-btn ml-3"
                                        href={`/dashboard/admin/items/edit/${item._id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        title="Delete"
                                        className="ml-3 delete-btn"
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
                    <div key={index} className="sm:hidden">
                        <ItemCard item={item} handleDelete={handleDelete}/>
                    </div>
                ))}

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        ));
};

export default Page;
