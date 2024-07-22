import Link from "next/link";

const NotAuthorisedPage = () => {
    return (
        <div className={`h-screen flex flex-col gap-2 justify-center items-center bg-gray-200 p-4`}>
            <h1 className={`font-bold text-center`}>You are not authorised to view this page</h1>
            <Link href={`/`} className={`p-2 bg-black text-white rounded-lg`}>Go to Home</Link>
        </div>
    )
}

export default NotAuthorisedPage;