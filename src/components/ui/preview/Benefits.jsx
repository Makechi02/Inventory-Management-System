import {FaChartLine, FaPlug, FaSync, FaUserFriends} from 'react-icons/fa';

const Benefits = () => {
    const benefits = [
        {
            title: 'Real-Time Tracking',
            description: 'Monitor your inventory levels in real-time to prevent stockouts and overstocking.',
            icon: <FaSync className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Automated Reports',
            description: 'Generate insightful reports to make data-driven decisions effortlessly.',
            icon: <FaChartLine className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'User-Friendly Interface',
            description: 'Intuitive design makes it easy for anyone to manage inventory effectively.',
            icon: <FaUserFriends className="text-4xl mb-4 text-indigo-600" />,
        },
        {
            title: 'Seamless Integration',
            description: 'Easily connect with other systems to streamline your operations.',
            icon: <FaPlug className="text-4xl mb-4 text-indigo-600" />,
        },
    ];

    return (
        <section className={`py-16 bg-gradient-to-b from-gray-50 to-white`}>
            <div className={`container mx-auto px-6 text-center`}>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800 mb-8`}>
                    Why Choose Our Inventory Management System?
                </h2>
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10`}>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={`flex justify-center`}>{benefit.icon}</div>
                            <h3 className={`text-xl font-semibold text-gray-800 mb-2`}>{benefit.title}</h3>
                            <p className={`text-gray-600`}>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;