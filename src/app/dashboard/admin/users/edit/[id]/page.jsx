"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {UserService} from "@/service/UserService";
import BackBtn from "@/components/ui/dashboard/BackBtn";
import {toast} from "react-toastify";
import {SubmitBtn} from "@/components/ui/dashboard/Buttons";

const Page = ({params}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const router = useRouter();

    const handleEditUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (name === '') {
            toast.error("Name is blank");
            setLoading(false);
            return;
        }

        if (email === '') {
            toast.error("Email is blank");
            setLoading(false);
            return;
        }

        if (!role || role === "-- select role --") {
            toast.error("Please select a role");
            setLoading(false);
            return;
        }

        try {
            const updatedUser = {name, email, role};
            const response = await UserService.updateUser(user.id, updatedUser);

            if (response.status === 200) {
                toast.success('User updated successfully');
                setLoading(false);
                router.back();
            }
        } catch (e) {
            if (e.status === 400) {
                toast.error(e.response.data);
            } else {
                console.error(e);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchItemByID = () => {
            UserService.getUserById(params.id)
                .then(response => setUser(response.data))
                .catch(error => console.error(error));
        }

        fetchItemByID();
    }, []);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
    }, [user]);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit User</h1>

                <div className={`mt-4`}>
                    {user.name ? (
                        <form className={`flex flex-col gap-3`} onSubmit={handleEditUser}>
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
                                    <label htmlFor={`brand`} className={`dashboard-label`}>Email:</label>
                                    <input
                                        type={`text`}
                                        id={`brand`}
                                        value={email}
                                        autoComplete={`off`}
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
                                        <option value={'USER'}>USER</option>
                                        <option value={'ADMIN'}>ADMIN</option>
                                    </select>
                                </div>
                            </div>

                            <SubmitBtn loading={loading} text={`Save Changes`} />
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