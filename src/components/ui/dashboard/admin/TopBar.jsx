import NavLinks from "@/components/ui/dashboard/admin/NavLinks";
import UserPanel from "@/components/ui/dashboard/admin/UserPanel";

const TopBar = () => {
    return (
        <div className={`bg-white h-[50px] flex gap-4 justify-between items-center px-8`}>
            <NavLinks/>
            <UserPanel/>
        </div>
    )
}

export default TopBar;