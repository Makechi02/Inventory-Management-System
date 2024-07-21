"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import CategoryService from "@/service/CategoryService";
import ItemService from "@/service/ItemService";
import {useRouter} from "next/navigation";

const Page = ({params}) => {
    const [item, setItem] = useState({});

    const [name, setName] = useState(item.name);
    const [brand, setBrand] = useState(item.brand);
    const [model, setModel] = useState(item.model);
    const [quantity, setQuantity] = useState(item.quantity)
    const [price, setPrice] = useState(item.price);
    const [category, setCategory] = useState(item.category);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState();
    const router = useRouter();

    const handleEditItem = async (e) => {
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
            const updatedItem = {...item, name, brand, model, quantity, price, category};

            const response = await ItemService.updateItem(item._id, updatedItem);

            if (response.status === 200) {
                alert("Item updated successfully");
                router.back();
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchAllCategories = () => {
            CategoryService.getAllCategories()
                .then(response => setCategories(response.data))
                .catch(error => console.error(error));
        };

        const fetchItemByID = () => {
            ItemService.getItemById(params.id)
                .then(response => {
                    setItem(response.data[0]);
                    fetchAllCategories();
                })
                .catch(error => console.error(error));
        }

        fetchItemByID();
    }, []);

    useEffect(() => {
        setName(item.name);
        setBrand(item.brand);
        setModel(item.model);
        setQuantity(item.quantity);
        setPrice(item.price);
        setCategory(item.category);
    }, [item]);

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

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
                <h1 className={`page-heading`}>Edit item</h1>

                <div className={`mt-4`}>
                    {item.name ? (
                        <form className={`flex flex-col gap-3`} onSubmit={handleEditItem}>

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
                                    value={category?._id}
                                    onChange={event => setCategory(event.target.value)}
                                    className={`border-2 border-black w-full sm:max-w-md px-2 py-2 rounded-lg bg-transparent`}
                                >
                                    <option>-- select category --</option>
                                    {categories?.map((cat) => (
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <button className={`add-btn w-fit mt-4`} type={`submit`}>Save</button>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Page;