"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";
import {useRouter} from "next/navigation";

const Page = ({params}) => {
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleEditCategory = (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Category name is blank");
            return;
        }

        const updatedCategory = {...category, name: name};
        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(params.id, data)
            .then(response => {
                if (response.status === 200) {
                    alert('Category updated successfully');
                    router.back();
                }
            });
    }

    useEffect(() => {
        const fetchCategoryById =  () => {
            CategoryService.getCategoryById(params.id)
                .then(response => setCategory(response?.data[0]))
                .catch(error => console.error(error));
        }

        fetchCategoryById();
    }, []);

    useEffect(() => {
        setName(category.name);
    }, [category]);

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

    return (
        <section className={`md:px-[10%]`}>
            <Link
                href={`/dashboard/admin/categories`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/>
                Back
            </Link>
            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit category</h1>

                <div className={`mt-4`}>
                    {category.name ? (
                        <form className={`flex flex-col gap-2`} onSubmit={handleEditCategory}>
                            <p className={`text-red-500`}>{errorMessage && errorMessage}</p>

                            <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                            <input
                                type={`text`}
                                id={`name`}
                                value={name}
                                enterKeyHint={`done`}
                                autoComplete={`off`}
                                className={`dashboard-input`}
                                onChange={event => setName(event.target.value)}
                            />
                            <button className={`add-btn w-fit mt-4`} type={`submit`}>Save</button>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;