"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {FaChevronLeft} from "react-icons/fa";

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
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email]);

    return (
        <div className={`h-full flex items-center justify-center`}>
            <div className={`flex flex-col gap-6 w-[90%] md:w-[60%]`}>
                <Link href={`/accounts/login`} className={`flex gap-1 items-center shadow w-fit p-2 rounded-lg`}>
                    <FaChevronLeft/>
                    Back
                </Link>
                <div>
                    <h1 className={`font-bold font-gfs_didot text-2xl`}>Forgot Password</h1>
                    <p className={`text-sm text-gray-700`}>Enter your registered email address we'll send you a code to reset your password.</p>
                </div>
                <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                    <div>
                        {errorMessage && (
                            <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                        )}
                    </div>

                    <div className={`input-box`}>
                        <label htmlFor={`email`} className={`label`}>Email address *</label>
                        <input
                            type={`email`}
                            className={`input`}
                            id={`email`}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <button className={`bg-black text-white p-2 rounded-lg`}>Recover Password</button>
                </form>
            </div>
        </div>
    )
}

export default Page;