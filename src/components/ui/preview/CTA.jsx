import Link from "next/link";

const CTA = () => {
    return (
        <section className={`bg-indigo-600 text-white py-16 animate__animated animate__fadeIn`}>
            <div className={`container mx-auto px-6 text-center`}>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot mb-4`}>Ready to Take Control of Your Inventory?</h2>
                <p className={`mb-6`}>
                    Sign up today and experience the benefits of our intuitive inventory management system!
                </p>
                <Link
                    href={`/accounts/login`}
                    className={`bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300`}
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
}

export default CTA;