"use client"

import CategoryService from "@/service/CategoryService";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

const AddCategoryForm = ({userID}) => {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Category name is required");
            return;
        }

        try {
            const newCategory = {name, createdBy: userID, updatedBy: userID};
            const response = await CategoryService.addCategory(newCategory);
            if (response.status === 201) {
                toast.success('New Category added successfully');
                router.back();
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to create the category. Please try again.");
        }
    }

    return (
        <form className={`flex flex-col gap-2`} onSubmit={handleAddCategory}>
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
            <button className={`dashboard-submit-btn`} type={`submit`}>Add Category</button>
        </form>
    )
}

export default AddCategoryForm;