"use client"

import {FaChevronDown, FaChevronUp, FaRegBell, FaRegUserCircle, FaSignOutAlt} from "react-icons/fa";
import Link from "next/link";

import {useState} from "react";
import {signOut} from "next-auth/react";

const UserPanel = ({user}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    }

    return (
        <div className={`flex gap-4 items-center`}>
            <button className={`border p-2 rounded-xl bg-gray-200`}>
                <FaRegBell/>
            </button>
            <div className={`bg-gray-200 px-3 py-1 rounded-xl flex gap-2 items-center`}>
                <p>{user.name.split(" ")[0]}</p>
                <button onClick={toggleDropdown} className={`text-sm text-gray-600`}>
                    {!isDropdownVisible ? <FaChevronDown/> : <FaChevronUp/>}
                </button>

                <ProfileDropdown isDropdownVisible={isDropdownVisible} toggleDropdown={toggleDropdown} user={user}/>
            </div>
        </div>
    )
}

const ProfileDropdown = ({isDropdownVisible, toggleDropdown, user}) => {
    const handleLogout = async () => {
        await signOut({callbackUrl: '/accounts/login'});
    }

    const firstLetter = user.name.split("")[0];
    const secondLetter = user.name.split(" ")[1]?.split("")[0];

    return (
        <div
            className={`absolute top-16 w-[calc(100%-2rem)] sm:w-[250px] flex flex-col gap-2 right-4 sm:right-8 bg-white rounded-xl py-2 ${!isDropdownVisible && 'hidden'}`}>
            <div className={`flex items-center gap-2 px-4 py-2`}>
                <div className={`h-[60px] aspect-square flex items-center justify-center bg-gray-200 rounded-full`}>
                    <p className={`font-gfs_didot font-bold text-lg`}>{firstLetter.toUpperCase()}</p>
                    <p className={`font-gfs_didot font-bold text-lg`}>{secondLetter?.toUpperCase()}</p>
                </div>
                <div>
                    <p>{user.name}</p>
                    <p className={`text-gray-600 text-xs font-gfs_didot`}>{user.role}</p>
                </div>
            </div>

            <hr/>

            <Link
                href={`/dashboard/${user.role.toLowerCase()}/profile`}
                className={`flex items-center gap-2 px-4 py-2`}
                onClick={toggleDropdown}
            >
                <FaRegUserCircle/>
                Manage Account
            </Link>
            <button
                onClick={handleLogout}
                className={`px-4 py-2 flex gap-2 items-center bg-gray-100 text-gray-600`}
            >
                <FaSignOutAlt/>
                Logout
            </button>
        </div>
    )
}

export default UserPanel;