import TopBar from "@/components/ui/dashboard/admin/TopBar";

const Layout = ({children}) => {
    return (
        <div className={`min-h-screen bg-gray-200`}>
            <TopBar/>
            <div className={`py-4 px-4 sm:px-8`}>
                {children}
            </div>
        </div>
    )
}

export default Layout;