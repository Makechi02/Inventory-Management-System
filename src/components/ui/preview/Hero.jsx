import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16 md:py-24">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl font-gfs_didot">
                            Effortless Inventory Management
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Manage your inventory efficiently and accurately with our user-friendly platform.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={`/accounts/login`}
                                className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-64 w-full md:h-full md:w-auto">
                        <Image
                            src={`/assets/images/screenshots/Screenshot_1.png`}
                            alt={`Inventory management screenshot`}
                            layout={`fill`}
                            objectFit={`contain`}
                            className={`rounded-md shadow-lg`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;