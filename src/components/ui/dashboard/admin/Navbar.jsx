"use client"

import {FaBars} from "react-icons/fa";
import {useState} from "react";
import {MobileNavigation, PrimaryNavigation} from "@/components/ui/dashboard/admin/Navigation";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const toggleNavbar = () => {
        setShowNavbar(prevState => !prevState);
    }

    return (
        <div className={`h-full`}>
            <div className={`h-full flex sm:hidden items-center`}>
                {!showNavbar && <button onClick={toggleNavbar}><FaBars/></button>}
            </div>

            <PrimaryNavigation/>
            <MobileNavigation showNavbar={showNavbar} toggleNavbar={toggleNavbar}/>
        </div>
    )
}

export default Navbar;