import BackBtn from "@/components/ui/dashboard/BackBtn";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import AddSupplierForm from "@/components/ui/dashboard/admin/suppliers/AddSupplierForm";

const Page = async () => {
    const {user} = await getServerSession(authOptions);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add supplier</h1>

                <div className={`mt-4`}>
                    <AddSupplierForm userID={user.id} />
                </div>
            </div>
        </section>
    )
}

export default Page;