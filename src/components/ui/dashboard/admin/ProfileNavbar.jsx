"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";

const ProfileNavbar = () => {
    const profileNavLinks = [
        {href: "/dashboard/admin/profile", text: "personal information"},
        {href: "/dashboard/admin/profile/security", text: "security"}
    ]

    const pathname = usePathname();

    return (
        <ul className={`my-10 pl-4 flex md:flex-col gap-3 text-gray-600`}>
            {profileNavLinks.map((link, index) => {
                const isActive = pathname.endsWith(link.href);

                return (
                    <li key={index} className={`capitalize ${isActive && 'font-bold text-black text-lg'}`}>
                        <Link href={link.href}>{link.text}</Link>
                    </li>
                )
            })}
            <li>
                <button>Logout</button>
            </li>
        </ul>
    )
}

export default ProfileNavbar;