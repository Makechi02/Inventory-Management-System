import BackBtn from "@/components/ui/dashboard/BackBtn";
import AddCategoryForm from "@/components/ui/dashboard/admin/category/AddCategoryForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
    const {user} = await getServerSession(authOptions);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add category</h1>

                <div className={`mt-4`}>
                    <AddCategoryForm userID={user.id} />
                </div>
            </div>
        </section>
    )
}

export default Page;