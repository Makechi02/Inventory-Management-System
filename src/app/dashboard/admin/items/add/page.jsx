import AddItemForm from "@/components/ui/dashboard/admin/items/AddItemForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import BackBtn from "@/components/ui/dashboard/BackBtn";

const Page = async () => {
    const {user} = await getServerSession(authOptions);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>
            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add Item</h1>
                <p className={`text-gray-600 text-sm`}>Please enter your item information</p>

                <div className={`mt-4`}>
                    <AddItemForm userID={user.id}/>
                </div>
            </div>
        </section>
    )
}

export default Page;