"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CategoryService from "@/service/CategoryService";
import {toast} from "react-toastify";

const EditCategoryForm = ({categoryID, userID}) => {
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const router = useRouter();

    const handleEditCategory = (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Category name is required");
            return;
        }

        const updatedCategory = {name: name.trim(), updatedBy: userID};

        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(categoryID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Category updated successfully');
                    router.back();
                }
            });
    }

    useEffect(() => {
        const fetchCategoryById =  () => {
            CategoryService.getCategoryById(categoryID)
                .then(response => setCategory(response?.data[0]))
                .catch(error => console.error(error));
        }

        fetchCategoryById();
    }, []);

    useEffect(() => {
        setName(category.name);
    }, [category]);

    return (
        category.name ? (
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
        )
    )
}

export default EditCategoryForm;