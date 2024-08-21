"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CategoryService from "@/service/CategoryService";
import {showSuccessDialog} from "@/utils/sweetalertUtil";

const EditCategoryForm = ({categoryID, userID}) => {
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleEditCategory = (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Category name is required");
            return;
        }

        const updatedCategory = {name: name.trim(), updatedBy: userID};

        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(categoryID, data)
            .then(response => {
                if (response.status === 200) {
                    showSuccessDialog('Category updated successfully', () => router.back());
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

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

    return (
        category.name ? (
            <form className={`flex flex-col gap-2`} onSubmit={handleEditCategory}>
                {errorMessage && (
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg">
                        <p>{errorMessage}</p>
                    </div>
                )}

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
        )
    )
}

export default EditCategoryForm;