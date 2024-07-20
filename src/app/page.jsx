import Link from "next/link";

const Home = () => {
    return (
        <div className={`bg-gray-200 h-screen flex flex-col gap-4 items-center justify-center py-10 px-4`}>
            <h1 className={`font-extrabold text-4xl tracking-wide text-center`}>Inventory Management System</h1>
            <Link
                href={`/dashboard/admin`}
                className={`border-2 border-black p-2 rounded-lg hover:bg-black hover:text-gray-100`}
            >
                Navigate to Dashboard
            </Link>
        </div>
    )
}

export default Home;