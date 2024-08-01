import BackBtn from "@/components/ui/dashboard/BackBtn";
import EditCategoryForm from "@/components/ui/dashboard/admin/category/EditCategoryForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const Page = async ({params}) => {
    const {user} = await getServerSession(authOptions);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit category</h1>

                <div className={`mt-4`}>
                    <EditCategoryForm categoryID={params.id} userID={user.id}/>
                </div>
            </div>
        </section>
    )
}

export default Page;