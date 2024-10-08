import Navbar from "@/components/ui/dashboard/Navbar";
import UserPanel from "@/components/ui/dashboard/UserPanel";

const TopBar = ({ user }) => {
    return (
        <div className={`bg-white shadow-md h-[60px] flex gap-6 justify-between items-center px-6`}>
            <Navbar role={user.role} />
            <UserPanel user={user} />
        </div>
    );
};

export default TopBar;