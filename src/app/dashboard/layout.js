import TopBar from "@/components/ui/dashboard/TopBar";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {jwtDecode} from "jwt-decode";
import {signOut} from "next-auth/react";

const Layout = async ({children}) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/accounts/login");
    } else {
        if (session.accessToken) {
            const accessToken = session.accessToken;
            const decodedToken = jwtDecode(accessToken);
            const expiryTime = decodedToken.exp * 10000;
            const currentTime = Date.now();

            if (currentTime > expiryTime) {
                await signOut({callbackUrl: '/accounts/login'});
            }
        }
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