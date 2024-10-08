import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaTimes} from "react-icons/fa";

const PrimaryNavigation = ({role}) => {
    return (
        <nav className={`bg-white h-full hidden sm:block`}>
            <ul className={`flex h-full`}>
                {role === 'ADMIN' ? <AdminNavLinks/> : <NavLinks/>}
            </ul>
        </nav>
    )
}

const MobileNavigation = ({ showNavbar, toggleNavbar, role }) => {
    return (
        <nav className={`block sm:hidden bg-white shadow-xl rounded-lg fixed top-0 left-0 w-full z-50 transition-transform transform ${showNavbar ? "translate-y-0" : "-translate-y-full"} duration-300`}>
            <button onClick={toggleNavbar} className={`absolute top-4 right-4 text-gray-700`}><FaTimes /></button>
            <ul className={`divide-y divide-gray-300 p-4`}>
                {role === 'ADMIN' ? <AdminNavLinks toggleNavbar={toggleNavbar} /> : <NavLinks toggleNavbar={toggleNavbar} />}
            </ul>
        </nav>
    );
};


const AdminNavLinks = ({toggleNavbar}) => {
    const navLinks = [
        { link: 'Dashboard', href: '/dashboard/admin' },
        { link: 'Items', href: '/dashboard/admin/items' },
        { link: 'Categories', href: '/dashboard/admin/categories' },
        { link: 'Suppliers', href: '/dashboard/admin/suppliers' },
        { link: 'Customers', href: '/dashboard/admin/customers' },
        { link: 'Users', href: '/dashboard/admin/users' },
    ];

    const pathname = usePathname();

    return (
        <>
            {navLinks.map((link, index) => {
                const isActive = pathname.endsWith(link.href);
                return (
                    <NavLink key={index} link={link} isActive={isActive} toggleNavbar={toggleNavbar}/>
                )
            })}
        </>
    )
}

const NavLinks = ({toggleNavbar}) => {
    const navLinks = [
        { link: 'Dashboard', href: '/dashboard/user' },
        { link: 'Items', href: '/dashboard/user/items' },
        { link: 'Profile', href: '/dashboard/user/profile' }
    ];

    const pathname = usePathname();

    return (
        <>
            {navLinks.map((link, index) => {
                const isActive = pathname.endsWith(link.href);
                return (
                    <NavLink key={index} link={link} isActive={isActive} toggleNavbar={toggleNavbar}/>
                )
            })}
        </>
    )
}

const NavLink = ({link, toggleNavbar, isActive}) => {
    return (
        <li>
            <div
                className={`w-full flex items-center h-full px-2 text-gray-600 transition-all ${isActive && 'border-b-4 border-b-black'}`}>
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
}

export {PrimaryNavigation, MobileNavigation};