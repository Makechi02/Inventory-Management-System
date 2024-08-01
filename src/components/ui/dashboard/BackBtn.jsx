"use client"

import {FaChevronLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";

const BackBtn = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`bg-[#333333] hover:bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
        >
            <FaChevronLeft/> Back
        </button>
    )
}

export default BackBtn;