"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {UserAuthService} from "@/service/UserService";
import {showSuccessDialog} from "@/utils/sweetalertUtil";

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleAddUser = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Name is blank");
            return;
        }

        if (email === '') {
            setErrorMessage("Email is blank");
            return;
        }

        const newUser = {name, email, role, password: role.toLowerCase()};
        console.log(newUser);

        UserAuthService.saveUser(newUser)
            .then(response => {
                showSuccessDialog(response.data.message, () => router.back());
            })
            .catch(error => {
                const response = error?.response;
                if (response.status === 409) {
                    setErrorMessage(response.data.message);
                } else {
                    console.error(error?.response);
                }
            });
    }

    useEffect(() => {
        setErrorMessage("");
    }, [name]);

    return (
        <section className={`md:px-[10%]`}>
            <Link
                href={`/dashboard/admin/users`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/>
                Back
            </Link>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add user</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-2`} onSubmit={handleAddUser}>
                        <p className={`text-red-500`}>{errorMessage && errorMessage}</p>

                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    value={name}
                                    enterKeyHint={`next`}
                                    onChange={event => setName(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                                <input
                                    type={`email`}
                                    id={`email`}
                                    value={email}
                                    enterKeyHint={`next`}
                                    onChange={event => setEmail(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`category`} className={`dashboard-label`}>Role:</label>
                                <select
                                    id={`category`}
                                    value={role}
                                    className={`dashboard-input`}
                                    onChange={event => setRole(event.target.value)}
                                >
                                    <option value={`USER`}>USER</option>
                                    <option value={`ADMIN`}>ADMIN</option>
                                </select>
                            </div>
                        </div>
                            <button className={`add-btn w-fit mt-4`} type={`submit`}>Add</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Page;