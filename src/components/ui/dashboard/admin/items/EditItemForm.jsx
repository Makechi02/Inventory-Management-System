"use client"

import ItemService from "@/service/ItemService";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CategoryService from "@/service/CategoryService";
import SupplierService from "@/service/SupplierService";
import {toast} from "react-toastify";

const EditItemForm = ({itemID, userID}) => {
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const router = useRouter();

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

        const fetchItemByID = async () => {
            try {
                const response = await ItemService.getItemById(itemID);
                const itemData = response.data[0];
                setItem(itemData);
                setName(itemData.name);
                setBrand(itemData.brand);
                setModel(itemData.model);
                setQuantity(itemData.quantity);
                setPrice(itemData.price);
                setCategory(itemData.category);
                setSupplier(itemData.supplier);

                fetchAllCategories();
                fetchAllSuppliers();
            } catch (error) {
                console.error(error);
            }
        };

        fetchItemByID();
    }, [itemID]);

    const handleEditItem = async (e) => {
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
            const updatedItem = {
                name,
                brand,
                model,
                quantity: numericQuantity,
                price: numericPrice,
                category,
                supplier,
                updatedBy: userID
            };
            const response = await ItemService.updateItem(item._id, updatedItem);

            if (response.status === 200) {
                toast.success('Item updated successfully');
                router.back();
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to update item");
        }
    };

    return (
        <form className={`space-y-6`} onSubmit={handleEditItem}>
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
                        value={category?._id}
                        onChange={event => setCategory(event.target.value)}
                    >
                        <option value="">-- select category --</option>
                        {categories?.map((cat) => (
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
                        <option value="">-- select supplier --</option>
                        {suppliers?.map((supp) => (
                            <option key={supp._id} value={supp._id}>{supp.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className={`dashboard-submit-btn`} type={`submit`}>Save Item</button>
        </form>
    );
};

export default EditItemForm;
