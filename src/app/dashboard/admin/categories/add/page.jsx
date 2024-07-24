"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";
import {useRouter} from "next/navigation";

const Page = () => {
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

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
                router.back();
            }
        } catch (e) {
            console.error(e);
        }
    }

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
                <h1 className={`page-heading`}>Add category</h1>

                <div className={`mt-4`}>
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
                </div>
            </div>
        </section>
    )
}

export default Page;