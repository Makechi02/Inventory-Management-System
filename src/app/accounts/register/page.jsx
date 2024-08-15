"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {UserAuthService} from "@/service/UserService";

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (name === '') {
            setErrorMessage("Name can't be blank");
            return;
        }


        if (email === '') {
            setErrorMessage("Email can't be blank");
            return;
        }

        if (password === '' || confirmPassword === '') {
            setErrorMessage("Password can't be blank");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }

        UserAuthService.saveUser({name, email, password, role: "USER"})
            .then(response => {
                setLoading(false);
                alert(response.data.message);
                router.push("/accounts/login");
            })
            .catch(error => {
                setLoading(false);
                const response = error?.response;
                if (response.status === 409) {
                    setErrorMessage(response.data.message);
                } else {
                    console.error(error?.response);
                }
            });
    }

    useEffect(() => {
        setErrorMessage('');
    }, [name, email, password, confirmPassword]);

    return (
        <div className={`h-full flex items-center justify-center`}>
            <div className={`flex flex-col gap-6 w-[90%] md:w-[60%]`}>
                <div>
                    <h1 className={`font-bold font-gfs_didot text-2xl`}>Create Account 👋</h1>
                    <p className={`text-sm text-gray-700`}>Please enter details</p>
                </div>
                <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                    <div>
                        {errorMessage && (
                            <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                        )}
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`name`} className={`label`}>Full Name *</label>
                        <input
                            type={`text`}
                            className={`input`}
                            id={`name`}
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`email`} className={`label`}>Email address *</label>
                        <input
                            type={`email`}
                            className={`input`}
                            id={`email`}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`password`} className={`label`}>Password *</label>
                        <input
                            type={`password`}
                            className={`input`}
                            id={`password`}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>

                    <div className={`login-input-box`}>
                        <label htmlFor={`confirm-password`} className={`label`}>Confirm Password *</label>
                        <input
                            type={`password`}
                            className={`input`}
                            id={`confirm-password`}
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                    </div>

                    <button className={`bg-[#333333] hover:bg-black text-white p-2 rounded-lg`}>
                        {loading ? "Loading..." : "Sign Up"}
                    </button>
                </form>

                <div className={`flex items-center gap-1`}>
                    <p className={`text-sm`}>Already have an account?</p>
                    <Link href={`/accounts/login`} className={`text-sm text-gray-700 underline`}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Page;