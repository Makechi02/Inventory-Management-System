import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section className={`bg-gradient-to-b min-h-screen from-gray-100 to-white py-16 md:py-20`}>
            <div className={`container mx-auto px-6 text-center`}>
                <h1 className={`text-3xl md:text-5xl font-bold font-gfs_didot text-gray-800 mb-4 animate__animated animate__fadeIn`}>
                    Effortlessly Manage Your Inventory
                </h1>

                <p className={`text-base md:text-lg text-gray-600 mb-8 animate__animated animate__fadeIn animate__delay-1s`}>
                    Your go-to solution for seamless stock control and management.
                </p>

                <div className={`flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4`}>
                    <Link
                        href={`/accounts/login`}
                        className={`bg-indigo-400 text-white font-semibold py-3 px-6 rounded-md shadow-md hover:bg-indigo-500 hover:scale-105 transform transition-transform duration-300`}
                    >
                        Get Started
                    </Link>

                    <Link
                        href={`/learn-more`}
                        className={`border-2 border-indigo-400 text-indigo-400 font-semibold py-3 px-6 rounded-md hover:bg-indigo-50 hover:scale-105 transform transition-transform duration-300`}
                    >
                        Learn More
                    </Link>
                </div>

                <div className={`mt-12 animate__animated animate__fadeInUp animate__delay-2s`}>
                    <Image
                        src={`/assets/images/screenshots/Screenshot_1.png`}
                        alt={`Inventory management screenshot`}
                        width={500}
                        height={300}
                        className={`mx-auto`}
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
}

export default Hero;