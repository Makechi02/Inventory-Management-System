import {FaBook, FaClock, FaLaptop} from "react-icons/fa";

const Benefits = () => {
    const benefits = [
        {
            title: 'Real-Time Tracking',
            description: 'Monitor your inventory levels in real-time to prevent stockouts and overstocking.',
            icon: <FaClock/>,
        },
        {
            title: 'Automated Reporting',
            description: 'Generate detailed reports automatically, saving time and reducing errors.',
            icon: <FaBook/>,
        },
        {
            title: 'User-Friendly Interface',
            description: 'Easily navigate through the system with an intuitive and user-friendly interface.',
            icon: <FaLaptop/>,
        },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center">Benefits of Using Our System</h2>
                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="text-center">
                            <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 mb-4 text-white text-2xl`}>
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                            <p className="mt-2 text-gray-600">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;