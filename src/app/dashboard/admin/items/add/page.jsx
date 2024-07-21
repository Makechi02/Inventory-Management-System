"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";
import ItemService from "@/service/ItemService";
import {useRouter} from "next/navigation";

const Page = () => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    const handleAddItem = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Item name is blank");
            return;
        }

        if (brand === '') {
            setErrorMessage("Brand is blank");
            return;
        }

        if (model === '') {
            setErrorMessage("Model is blank");
            return;
        }

        if (quantity <= 0) {
            setErrorMessage("Invalid quantity");
            return;
        }

        if (price <= 0) {
            setErrorMessage("Invalid price");
            return;
        }

        if (!category || category === "-- select category --") {
            setErrorMessage("Please choose a category");
            return;
        }

        try {
            const newItem = {name, brand, model, quantity, price, category};

            const response = await ItemService.addItem(newItem);

            if (response.status === 201) {
                alert("New Item added successfully");
                router.back();
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchAllCategories = () => {
            CategoryService.getAllCategories()
                .then(response => setCategories(response.data));
        };

        fetchAllCategories();
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [name, brand, model, quantity, price, category]);

    return (
        <>
            <Link
                href={`/dashboard/admin/items`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/>
                Back
            </Link>
            <div className={`bg-white p-4 rounded-lg mt-4`}>
                <h1 className={`page-heading`}>Add Item</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-3`} onSubmit={handleAddItem}>

                        <p className={`text-red-500`}>
                            {errorMessage && errorMessage}
                        </p>

                        <div className={`input-box`}>
                            <label htmlFor={`name`}>Name:</label>
                            <input
                                type={`text`}
                                id={`name`}
                                value={name}
                                onChange={event => setName(event.target.value)}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`brand`}>Brand:</label>
                            <input
                                type={`text`}
                                id={`brand`}
                                value={brand}
                                onChange={event => setBrand(event.target.value)}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`model`}>Model:</label>
                            <input
                                type={`text`}
                                id={`model`}
                                value={model}
                                onChange={event => setModel(event.target.value)}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`quantity`}>Quantity:</label>
                            <input
                                type={`number`}
                                id={`quantity`}
                                value={quantity}
                                onChange={event => setQuantity(event.target.value)}
                                enterKeyHint={`next`}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`price`}>Price:</label>
                            <input
                                type={`number`}
                                id={`price`}
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-1 rounded-lg`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`category`}>Category:</label>
                            <select
                                id={`category`}
                                className={`border-2 border-black w-full sm:max-w-md px-2 py-2 rounded-lg bg-transparent`}
                                onChange={event => setCategory(event.target.value)}
                            >
                                <option>-- select category --</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Page;