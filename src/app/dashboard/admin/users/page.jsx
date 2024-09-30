"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import {UserCard} from "@/components/ui/dashboard/admin/TableCards";
import DateUtil from "@/utils/dateUtil";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {useRouter, useSearchParams} from "next/navigation";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {toast} from "react-toastify";
import {UserService} from "@/service";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const router = useRouter();

    const handleDelete = (user) => {
        showConfirmDialog(
            `Are you sure you want to delete user ${user.name}?`,
            () => deleteUser(user)
        );
    }

    const deleteUser = (user) => {
        UserService.deleteUser(user.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('User deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        setLoading(true);
        const fetchUsers = () => {
            UserService.getAllUsers({query})
                .then(response => {
                    setUsers(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    if (error.response.data === "No server response") {
                        toast.error(error.response.data);
                    }
                    console.error(error);
                    setLoading(false);
                });
        };

        fetchUsers();
    }, [query]);

    return (
        <div className={`bg-white py-4 p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Users</h1>

            <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                <SearchForm/>
                <Link href={`/dashboard/admin/users/add`} className={`add-btn`}>Add User</Link>
            </div>

            <div className={`mt-8`}>
                {loading ? (
                    <LoadingSpinner/>
                ) : (
                    <UsersTable users={users} handleDelete={handleDelete}/>
                )}
            </div>
        </div>
    )
}

const UsersTable = ({users, handleDelete}) => {
    return (
        users.length === 0 ? (
            <div>
                <p className={`text-center`}>No users found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>S/No</th>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Email</th>
                            <th scope={`col`} className={`table-heading`}>Role</th>
                            <th scope={`col`} className={`table-heading`}>Added at</th>
                            <th scope={`col`} className={`table-heading`}>Updated at</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {users?.map((user, index) => (
                            <tr key={user.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{user.name}</td>
                                <td className={`table-data`}>{user.email}</td>
                                <td className={`table-data`}>{user.role}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(user.createdAt)}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(user.updatedAt)}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn`}
                                        href={`/dashboard/admin/users/edit/${user.id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <button
                                        className={`ml-3 delete-btn`} title={`Delete`}
                                        onClick={() => handleDelete(user)}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {users.map((user, index) => (
                    <div key={index} className={`sm:hidden`}>
                        <UserCard user={user} handleDelete={handleDelete}/>
                    </div>
                ))}
            </>
        )
    )
}

export default Page;