"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ItemService from "@/service/ItemService";
import CategoryService from "@/service/CategoryService";

const AddItemForm = ({userID}) => {
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
            setErrorMessage("Item brand is blank");
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
            const newItem = {name, brand, model, quantity, price, category, createdBy: userID, updatedBy: userID};

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
        <form className={`flex flex-col gap-4`} onSubmit={handleAddItem}>
            <p className={`text-red-500`}>{errorMessage && errorMessage}</p>

            <div className={`grid sm:grid-cols-2 gap-4`}>
                <div className={`input-box`}>
                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                    <input
                        type={`text`}
                        id={`name`}
                        value={name}
                        autoComplete={`off`}
                        onChange={event => setName(event.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`brand`} className={`dashboard-label`}>Brand:</label>
                    <input
                        type={`text`}
                        id={`brand`}
                        value={brand}
                        autoComplete={`off`}
                        onChange={event => setBrand(event.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`model`} className={`dashboard-label`}>Model:</label>
                    <input
                        type={`text`}
                        id={`model`}
                        value={model}
                        autoComplete={`off`}
                        onChange={event => setModel(event.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`quantity`} className={`dashboard-label`}>Quantity:</label>
                    <input
                        type={`number`}
                        id={`quantity`}
                        value={quantity}
                        onChange={event => setQuantity(event.target.value)}
                        enterKeyHint={`next`}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`price`} className={`dashboard-label`}>Price:</label>
                    <input
                        type={`number`}
                        id={`price`}
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`category`} className={`dashboard-label`}>Category:</label>
                    <select
                        id={`category`}
                        className={`dashboard-input`}
                        onChange={event => setCategory(event.target.value)}
                    >
                        <option>-- select category --</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
        </form>
    )
}

export default AddItemForm;