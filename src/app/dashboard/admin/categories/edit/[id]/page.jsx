"use client"

import BackBtn from "@/components/ui/dashboard/BackBtn";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import CategoryService from "@/service/CategoryService";

const Page =  ({params}) => {
    const categoryID = params.id;
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const router = useRouter();

    const handleEditCategory = (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Category name is required");
            return;
        }

        const updatedCategory = {name: name.trim()};

        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(categoryID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Category updated successfully');
                    router.back();
                }
            }).catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        const fetchCategoryById =  () => {
            CategoryService.getCategoryById(categoryID)
                .then(response => setCategory(response?.data))
                .catch(error => console.error(error));
        }

        fetchCategoryById();
    }, []);

    useEffect(() => {
        setName(category.name);
    }, [category]);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit category</h1>

                <div className={`mt-4`}>
                    {category.name ? (
                        <form className={`flex flex-col gap-2`} onSubmit={handleEditCategory}>
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
                            <button className={`dashboard-submit-btn w-fit mt-4`} type={`submit`}>Update Category</button>
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