"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import BackBtn from "@/components/ui/dashboard/BackBtn";
import {toast} from "react-toastify";
import {SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {UserAuthService} from "@/service";

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("USER");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleAddUser = async (e) => {
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

        const newUser = {name, email, role, password: role.toLowerCase()};

        try {
            const response = await UserAuthService.saveUser(newUser);
            if (response.status === 201) {
                toast.success(response.data.message);
                setLoading(false);
                router.back();
            }
        } catch (error) {
            const response = error?.response;
            if (response?.status === 409) {
                toast.error(response.data.message);
            } else if (response?.status === 400) {
                toast.error(response.data.errors.join(". "));
            } else {
                console.error(error);
            }
            setLoading(false);
        }
    }

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add user</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-2`} onSubmit={handleAddUser}>
                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    value={name}
                                    autoComplete={`off`}
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
                                    autoComplete={`off`}
                                    enterKeyHint={`next`}
                                    onChange={event => setEmail(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`role`} className={`dashboard-label`}>Role:</label>
                                <select
                                    id={`role`}
                                    value={role}
                                    className={`dashboard-input`}
                                    onChange={event => setRole(event.target.value)}
                                >
                                    <option value={`USER`}>USER</option>
                                    <option value={`ADMIN`}>ADMIN</option>
                                </select>
                            </div>
                        </div>
                        <SubmitBtn loading={loading} text={"Add User"} />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Page;