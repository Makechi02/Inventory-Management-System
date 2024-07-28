import Link from "next/link";
import {FaChevronLeft} from "react-icons/fa";
import EditItemForm from "@/components/ui/dashboard/admin/items/EditItemForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Page = async ({params}) => {
    const {user} = await getServerSession(authOptions);

    return (
        <section className={`md:px-[10%]`}>
            <Link
                href={`/dashboard/admin/items`}
                className={`bg-black text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit`}
            >
                <FaChevronLeft/> Back
            </Link>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit item</h1>

                <div className={`mt-4`}>
                    <EditItemForm itemID={params.id} userID={user.id} />
                </div>
            </div>
        </section>
    )
}

export default Page;