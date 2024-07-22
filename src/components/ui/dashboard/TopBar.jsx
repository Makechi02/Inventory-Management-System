import Navbar from "@/components/ui/dashboard/Navbar";
import UserPanel from "@/components/ui/dashboard/UserPanel";

const TopBar = ({user}) => {
    return (
        <div className={`bg-white h-[50px] flex gap-4 justify-between items-center px-8`}>
            <Navbar role={user.role} />
            <UserPanel user={user} />
        </div>
    )
}

export default TopBar;