"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useState, useEffect} from "react";
import CategoryService from "@/service/CategoryService";

const Page = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Category name is blank");
            return;
        }

        try {
            const newCategory = {name};
            const response = await CategoryService.addCategory(newCategory);
            if (response.status === 201) {
                alert("New Category added successfully");
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

    return (
        <>
            <Link
                href={`/dashboard/admin/categories`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/>
                Back
            </Link>
            <div className={`bg-white p-4 rounded-lg mt-4`}>
                <h1 className={`page-heading`}>Add category</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-2`}  onSubmit={handleAddCategory}>

                        <p className={`text-red-500`}>
                            {errorMessage && errorMessage}
                        </p>

                        <label htmlFor={`name`}>Name:</label>
                        <input
                            type={`text`}
                            id={`name`}
                            value={name}
                            onChange={event => setName(event.target.value)}
                            className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                        />
                        <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Page;