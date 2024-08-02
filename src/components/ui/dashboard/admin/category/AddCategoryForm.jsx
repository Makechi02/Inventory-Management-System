"use client"

import CategoryService from "@/service/CategoryService";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {showSuccessDialog} from "@/utils/sweetalertUtil";

const AddCategoryForm = ({userID}) => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Category name is blank");
            return;
        }

        try {
            const newCategory = {name, createdBy: userID, updatedBy: userID};
            const response = await CategoryService.addCategory(newCategory);
            if (response.status === 201) {
                showSuccessDialog('New Category added successfully', () => router.back());
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={`flex flex-col gap-2`} onSubmit={handleAddCategory}>
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
            <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
        </form>
    )
}

export default AddCategoryForm;