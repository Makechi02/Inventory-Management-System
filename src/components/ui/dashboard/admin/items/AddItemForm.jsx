"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ItemService from "@/service/ItemService";
import CategoryService from "@/service/CategoryService";
import SupplierService from "@/service/SupplierService";
import {toast} from "react-toastify";

const AddItemForm = ({userID}) => {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [supplier, setSupplier] = useState("");
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const router = useRouter();

    const handleAddItem = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Item name is required");
            return;
        }

        if (!brand.trim()) {
            toast.error("Item brand is required");
            return;
        }

        if (!model.trim()) {
            toast.error("Model is required");
            return;
        }

        const numericQuantity = parseFloat(quantity);
        if (isNaN(numericQuantity) || numericQuantity <= 0) {
            toast.error("Quantity must be a positive number");
            return;
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            toast.error("Price must be a positive number");
            return;
        }

        if (!category || category === "-- select category --") {
            toast.error("Please choose a category");
            return;
        }

        if (!supplier || supplier === "-- select supplier --") {
            toast.error("Please choose a supplier");
            return;
        }

        try {
            const newItem = {name, brand, model, quantity, price, category, supplier, createdBy: userID, updatedBy: userID};
            const response = await ItemService.addItem(newItem);

            if (response.status === 201) {
                toast.success('New Item added successfully');
                router.back();
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to create the item. Please try again.");
        }
    };

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllSuppliers = async () => {
            try {
                const response = await SupplierService.getAllSuppliers();
                setSuppliers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllCategories();
        fetchAllSuppliers();
    }, []);

    return (
        <form className={`space-y-6`} onSubmit={handleAddItem}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
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
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`supplier`} className={`dashboard-label`}>Supplier:</label>
                    <select
                        id={`supplier`}
                        className={`dashboard-input`}
                        value={supplier?._id}
                        onChange={event => setSupplier(event.target.value)}
                    >
                        <option>-- select supplier --</option>
                        {suppliers.map((sup) => (
                            <option key={sup._id} value={sup._id}>{sup.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className={`dashboard-submit-btn`} type={`submit`}>Add Item</button>
        </form>
    );
};

export default AddItemForm;
