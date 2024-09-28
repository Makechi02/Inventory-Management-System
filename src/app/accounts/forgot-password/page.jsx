"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {FaChevronLeft} from "react-icons/fa";
import {motion} from "framer-motion";

const Page = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            setErrorMessage("Email can't be blank");
            return;
        }

        console.log("Email: " + email);
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email]);

    return (
        <div className={`h-full flex items-center justify-center`}>
            <motion.div
                className={`flex flex-col gap-6 w-[90%] md:w-[60%]`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href={`/accounts/login`} className={`flex gap-1 items-center shadow w-fit p-2 rounded-lg`}>
                    <FaChevronLeft />
                    Back
                </Link>
                <div>
                    <h1 className={`font-bold font-gfs_didot text-2xl`}>Forgot Password</h1>
                    <p className={`text-sm text-gray-700`}>Enter your registered email address and we'll send you a code to reset your password.</p>
                </div>
                <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                    <div>
                        {errorMessage && (
                            <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                        )}
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`email`} className={`label`}>Email address *</label>
                        <input
                            type={`email`}
                            className={`input border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                            id={`email`}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <button className={`bg-[#333333] hover:bg-black text-white p-2 rounded-lg transition duration-200`}>
                        Recover Password
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Page;