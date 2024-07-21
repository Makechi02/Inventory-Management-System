import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaTimes} from "react-icons/fa";

const PrimaryNavigation = () => {
    return (
        <nav className={`bg-white h-full hidden sm:block`}>
            <ul className={`flex h-full`}>
                <NavLinks/>
            </ul>
        </nav>
    )
}

const MobileNavigation = ({showNavbar, toggleNavbar}) => {
    return (
        <nav
            className={`block sm:hidden bg-[#00000099] h-screen fixed left-0 top-0 w-full px-4 ${!showNavbar && 'hidden sm:flex'}`}>
            <button
                onClick={toggleNavbar}
                className={`text-white absolute top-4 left-8 text-lg border rounded-full p-1`}
            >
                <FaTimes/>
            </button>
            <ul className={`divide-y relative top-16 bg-white shadow-2xl w-full rounded-lg p-2`}>
                <NavLinks toggleNavbar={toggleNavbar}/>
            </ul>
        </nav>
    )
}

const NavLinks = ({toggleNavbar}) => {
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

    return (
        <>
            {navLinks.map((link, index) => {
                const isActive = pathname.endsWith(link.href);
                return (
                    <li key={index}>
                        <div className={`w-full flex items-center h-full px-2 text-gray-600 transition-all ${isActive && 'border-b-4 border-b-black'}`}>
                            <Link
                                href={link.href}
                                onClick={toggleNavbar}
                                className={`w-full hover:text-black hover:font-bold py-2 ${isActive && 'font-bold text-black'}`}
                            >
                                {link.link}
                            </Link>
                        </div>
                    </li>
                )
            })}
        </>
    )
}

export {PrimaryNavigation, MobileNavigation};