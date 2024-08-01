"use client"

import ItemService from "@/service/ItemService";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CategoryService from "@/service/CategoryService";
import Swal from "sweetalert2";
import SupplierService from "@/service/SupplierService";

const EditItemForm = ({itemID, userID}) => {
    const [item, setItem] = useState({});
    const [name, setName] = useState(item.name);
    const [brand, setBrand] = useState(item.brand);
    const [model, setModel] = useState(item.model);
    const [quantity, setQuantity] = useState(item.quantity)
    const [price, setPrice] = useState(item.price);
    const [category, setCategory] = useState(item.category);
    const [supplier, setSupplier] = useState(item.supplier);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState();
    const [suppliers, setSuppliers] = useState();
    const router = useRouter();

    useEffect(() => {
        const fetchAllCategories = () => {
            CategoryService.getAllCategories()
                .then(response => setCategories(response.data))
                .catch(error => console.error(error));
        };

        const fetchAllSuppliers = () => {
            SupplierService.getAllSuppliers()
                .then(response => setSuppliers(response.data))
                .catch(error => console.error(error));
        }

        const fetchItemByID = () => {
            ItemService.getItemById(itemID)
                .then(response => {
                    setItem(response.data[0]);
                    fetchAllCategories();
                    fetchAllSuppliers();
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
        setSupplier(item.supplier);
    }, [item]);

    useEffect(() => {
        setErrorMessage("");
    }, [name, brand, model, quantity, price, category, supplier]);

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

        if (!supplier || supplier === "-- select supplier --") {
            setErrorMessage("Please choose a supplier");
            return;
        }

        try {
            const updatedItem = {name, brand, model, quantity, price, category, supplier, updatedBy: userID};

            const response = await ItemService.updateItem(item._id, updatedItem);

            if (response.status === 200) {
                Swal.fire("Item updated successfully", "", "success")
                    .then(() => router.back());
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <form className={`flex flex-col gap-3`} onSubmit={handleEditItem}>
            <p className={`text-red-500`}>
                {errorMessage && errorMessage}
            </p>

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
                        <option>-- select category --</option>
                        {categories?.map((category, index) => (
                            <option key={index} value={category._id}>{category.name}</option>
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
                        {suppliers?.map((supplier, index) => (
                            <option key={index} value={supplier._id}>{supplier.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className={`add-btn w-fit mt-4`} type={`submit`}>Save</button>
        </form>
    )
}

export default EditItemForm;