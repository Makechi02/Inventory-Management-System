"use client"

import {FaPen} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import {useEffect, useState} from "react";
import {UserCard} from "@/components/ui/dashboard/admin/TableCards";
import {UserService} from "@/service/UserService";
import DateUtil from "@/utils/dateUtil";

const Page = () => {
    const [users, setUsers] = useState([]);

    const handleDelete = (user) => {
        const choice = confirm(`Are you sure you want to delete user ${user.name}?`);
        if (choice) deleteUser(user);
    }

    const deleteUser = (user) => {
        UserService.deleteUser(user._id)
            .then(response => {
                if (response.status === 200) {
                    alert("User deleted successfully");
                    window.location.reload();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchUsers = () => {
            UserService.getAllUsers()
                .then(response => setUsers(response.data))
                .catch(error => console.error(error));
        };

        fetchUsers();
    }, []);

    return (
        <div className={`bg-white py-4 p-4 rounded-lg shadow-lg`}>
            <h1 className={`page-heading`}>Users</h1>

            <div className={`mt-4 flex w-full justify-end`}>
                <Link href={`/dashboard/admin/users/add`} className={`add-btn`}>Add User</Link>
            </div>

            <div className={`mt-4`}>
                {users.length === 0 ? (
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
                                    <tr key={user._id}>
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
                                                href={`/dashboard/admin/users/edit/${user._id}`}
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
                )}
            </div>
        </div>
    )
}

export default Page;