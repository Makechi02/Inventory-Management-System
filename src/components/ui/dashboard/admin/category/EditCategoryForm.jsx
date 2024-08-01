"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CategoryService from "@/service/CategoryService";
import Swal from "sweetalert2";

const EditCategoryForm = ({categoryID, userID}) => {
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

        const updatedCategory = {name, updatedBy: userID};

        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(categoryID, data)
            .then(response => {
                if (response.status === 200) {
                    Swal.fire("Category updated successfully", "", "success")
                        .then(() => router.back());
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
        )
    )
}

export default EditCategoryForm;