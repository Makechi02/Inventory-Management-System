"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaBars, FaTimes} from "react-icons/fa";
import {useState} from "react";

const NavLinks = () => {
    const navLinks = [
        {
            link: 'Dashboard',
            href: '/dashboard/admin'
        },
        {
            link: 'Items',
            href: '/dashboard/admin/items'
        },
        {
            link: 'Categories',
            href: '/dashboard/admin/categories'
        },
        {
            link: 'Users',
            href: '/dashboard/admin/users'
        },
        {
            link: 'Profile',
            href: '/dashboard/admin/profile'
        },
    ];

    const pathname = usePathname();

    const [showNavbar, setShowNavbar] = useState(false);
    const toggleNavbar = () => {
        setShowNavbar(prevState => !prevState);
    }

    return (
        <nav className={`h-full`}>
            <div className={`h-full flex sm:hidden items-center`}>
                <button onClick={toggleNavbar}>
                    {showNavbar ? <FaTimes/> : <FaBars/>}
                </button>
            </div>
            <ul className={`flex flex-col sm:flex-row gap-2 sm:h-full absolute sm:static left-0 bg-white w-full transition-all ${!showNavbar && 'hidden sm:flex'}`}>
                {navLinks.map((link, index) => {
                    const isActive = pathname.endsWith(link.href);
                    return (
                        <li key={index}>
                            <div
                                className={`w-full flex items-center h-full px-2 text-gray-600 transition-all ${isActive && 'sm:border-b-4 border-b-black'}`}>
                                {showNavbar ? (
                                    <Link
                                        href={link.href}
                                        className={`w-full hover:text-black hover:font-bold py-2 ${isActive && 'font-bold text-black'}`}
                                        onClick={toggleNavbar}
                                    >
                                        {link.link}
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className={`w-full hover:text-black hover:font-bold py-2 ${isActive && 'font-bold text-black'}`}
                                    >
                                        {link.link}
                                    </Link>
                                )}
                            </div>
                            <hr className={`sm:hidden ${isActive && 'h-[4px] bg-black'}`}/>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default NavLinks;