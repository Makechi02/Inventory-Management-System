"use client"

import {FaChevronDown, FaChevronUp, FaRegBell, FaRegUserCircle, FaSignOutAlt} from "react-icons/fa";
import Link from "next/link";

import {useState} from "react";
import {signOut} from "next-auth/react";

const UserPanel = ({ user }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const toggleDropdown = () => setIsDropdownVisible(prevState => !prevState);

    return (
        <div className={`relative flex gap-4 items-center`}>
            <button className={`border p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200`}>
                <FaRegBell className={`text-gray-600`} />
            </button>
            <div className={`bg-gray-100 px-4 py-2 rounded-full flex gap-2 items-center`}>
                <p>{user.name.split(" ")[0]}</p>
                <button onClick={toggleDropdown} className={`text-sm text-gray-600`}>
                    {!isDropdownVisible ? <FaChevronDown /> : <FaChevronUp />}
                </button>
                <ProfileDropdown isDropdownVisible={isDropdownVisible} toggleDropdown={toggleDropdown} user={user} />
            </div>
        </div>
    );
};

const ProfileDropdown = ({ isDropdownVisible, toggleDropdown, user }) => {
    const handleLogout = async () => await signOut({ callbackUrl: '/accounts/login' });

    const firstLetter = user.name.charAt(0).toUpperCase();
    const secondLetter = user.name.split(" ")[1]?.charAt(0).toUpperCase();

    return (
        <div className={`absolute top-16 right-0 bg-white shadow-lg rounded-lg py-4 w-56 ${!isDropdownVisible && 'hidden'}`}>
            <div className={`flex items-center gap-3 px-4 py-2`}>
                <div className={`bg-indigo-500 text-white h-12 w-12 flex items-center justify-center rounded-full`}>
                    {firstLetter}{secondLetter}
                </div>
                <div>
                    <p className={`font-bold`}>{user.name}</p>
                    <p className={`text-sm text-gray-600`}>{user.role}</p>
                </div>
            </div>

            <hr className={`my-2`} />

            <Link
                href={`/dashboard/${user.role.toLowerCase()}/profile`}
                className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-100 transition-all duration-150`}
                onClick={toggleDropdown}
            >
                <FaRegUserCircle /> Manage Account
            </Link>

            <button
                onClick={handleLogout}
                className={`flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100 transition-all duration-150`}
            >
                <FaSignOutAlt /> Logout
            </button>
        </div>
    );
};

export default UserPanel;