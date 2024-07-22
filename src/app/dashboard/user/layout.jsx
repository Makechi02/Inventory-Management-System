import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

const Layout = async ({children}) => {
    const session = await getServerSession(authOptions);

    if (session.user.role !== 'USER') {
        redirect("/403");
    }

    return (
        <>
            {children}
        </>
    )
}

export default Layout;