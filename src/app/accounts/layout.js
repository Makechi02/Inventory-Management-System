const Layout = ({children}) => {
    return (
        <div className={`flex flex-col md:flex-row items-center justify-center h-[100svh] bg-gray-200 p-2 sm:p-4 md:p-0`}>
            <div className={`h-full flex-1 flex-col justify-end p-4 hidden md:flex`}>
                <h1 className={`font-gfs_didot text-3xl font-extrabold`}>Inventory Management System</h1>
            </div>
            <div className={`h-fit md:h-full w-[90%] md:flex-1 bg-white p-2 rounded-lg`}>
                {children}
            </div>
        </div>
    )
}

export default Layout;