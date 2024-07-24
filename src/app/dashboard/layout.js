import TopBar from "@/components/ui/dashboard/TopBar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const Layout = async ({children}) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/accounts/login");
    }

    return (
        <div className={`min-h-screen bg-gray-200`}>
            <TopBar user={session.user}/>
            <div className={`container mx-auto p-6`}>
                {children}
            </div>
        </div>
    )
}

export default Layout;