"use client"

import {useState} from "react";
import {FaTimes} from "react-icons/fa";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const FiltersModal = ({categories, isVisible, toggleVisibility}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

    const handleClearFilters = () => {
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
    }

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams);

        if (category) {
            params.set("category", category);
        } else {
            params.delete("category");
        }

        if (minPrice) {
            params.set("minPrice", minPrice);
        } else {
            params.delete("minPrice");
        }

        if (maxPrice) {
            params.set("maxPrice", maxPrice);
        } else {
            params.delete("maxPrice");
        }

        replace(`${pathname}?${params.toString()}`);
        toggleVisibility();
    }

    return (
        <div className={`absolute top-0 left-0 bg-[#00000044] w-full min-h-screen ${!isVisible && 'hidden'}`}>
            <div className={`bg-[#444] text-gray-50 w-full sm:max-w-md p-8 min-h-screen flex flex-col`}>
                <div className={`flex gap-2 justify-between items-center`}>
                    <h2 className={`page-heading`}>Filter Items</h2>
                    <button className={`border p-2 rounded-full`} onClick={toggleVisibility}>
                        <FaTimes/>
                    </button>
                </div>

                <div className={`mt-6 flex flex-col gap-3`}>
                    <h3 className={`font-bold font-gfs_didot`}>Category</h3>
                    <select
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                        className={`bg-gray-500 rounded-lg outline-0 w-full p-2`}
                    >
                        <option>-- Select Category --</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className={`mt-6 flex flex-col gap-3`}>
                    <h3 className={`font-bold font-gfs_didot`}>Price</h3>
                    <div className={`flex gap-4`}>
                        <div className={`flex-1 flex flex-col gap-2`}>
                            <label>Min. Price:</label>
                            <input
                                type={`number`}
                                value={minPrice}
                                onChange={event => setMinPrice(event.target.value)}
                                className={`w-full bg-gray-500 p-2 outline-0 rounded-lg`}
                            />
                        </div>

                        <div className={`flex-1 flex flex-col gap-2`}>
                            <label>Max. Price:</label>
                            <input
                                type={`number`}
                                value={maxPrice}
                                onChange={event => setMaxPrice(event.target.value)}
                                className={`w-full bg-gray-500 p-2 outline-0 rounded-lg`}
                            />
                        </div>
                    </div>
                </div>

                <div className={`mt-auto flex gap-4`}>
                    <button onClick={handleClearFilters} className={`flex-1 border p-2 rounded-lg`}>Clear filter</button>
                    <button onClick={handleApplyFilters} className={`flex-1 bg-blue-600 p-2 rounded-lg`}>Apply changes</button>
                </div>
            </div>
        </div>
    )
}

export default FiltersModal;