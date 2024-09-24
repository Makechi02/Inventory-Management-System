"use client"

import BackBtn from "@/components/ui/dashboard/BackBtn";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import CategoryService from "@/service/CategoryService";

const Page = () => {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (name === '') {
            toast.error("Category name is required");
            return;
        }

        try {
            const response = await CategoryService.addCategory({name});
            if (response.status === 201) {
                toast.success('New Category added successfully');
                router.back();
            }
        } catch (e) {
            if (e.status === 409) {
                toast.error(e.response.data.error);
            } else {
                console.error(e);
                toast.error("Failed to create the category. Please try again.");
            }
        }
    }

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add category</h1>

                <div className={`mt-4`}>
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
                </div>
            </div>
        </section>
    )
}

export default Page;