"use client"

import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {UserService} from "@/service/UserService";

const Page = ({params}) => {
    const [user, setUser] = useState({});

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleEditUser = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Name is blank");
            return;
        }

        if (email === '') {
            setErrorMessage("Email is blank");
            return;
        }

        if (!role || role === "-- select role --") {
            setErrorMessage("Please select a role");
            return;
        }

        try {
            const updatedUser = {...user, name, brand: email, role};

            const response = await UserService.updateUser(user._id, updatedUser);

            if (response.status === 200) {
                alert("User updated successfully");
                router.back();
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const fetchItemByID = () => {
            UserService.getUserById(params.id)
                .then(response => setUser(response.data[0]))
                .catch(error => console.error(error));
        }

        fetchItemByID();
    }, []);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }, [user]);

    useEffect(() => {
        setErrorMessage("");
    }, [name, email, role]);

    return (
        <section className={`md:px-[10%]`}>
            <Link
                href={`/dashboard/admin/users`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/>
                Back
            </Link>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4`}>
                <h1 className={`page-heading`}>Edit User</h1>

                <div className={`mt-4`}>
                    {user.name ? (
                        <form className={`flex flex-col gap-3`} onSubmit={handleEditUser}>
                            <p className={`text-red-500`}>{errorMessage && errorMessage}</p>

                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
                                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                    <input
                                        type={`text`}
                                        id={`name`}
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        className={`dashboard-input`}
                                    />
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`brand`} className={`dashboard-label`}>Email:</label>
                                    <input
                                        type={`text`}
                                        id={`brand`}
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        className={`dashboard-input`}
                                    />
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`category`} className={`dashboard-label`}>Role:</label>
                                    <select
                                        id={`category`}
                                        value={role}
                                        onChange={event => setRole(event.target.value)}
                                        className={`dashboard-input`}
                                    >
                                        <option>-- select role --</option>
                                        <option value={'USER'}>User</option>
                                        <option value={'ADMIN'}>Admin</option>
                                    </select>
                                </div>
                            </div>

                                <button className={`add-btn w-fit mt-4`} type={`submit`}>Save</button>
                        </form>
                        ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;