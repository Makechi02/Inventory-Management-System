"use client"

import {useState} from 'react';

const faqs = [
    {
        question: 'What features does the inventory management system offer?',
        answer: 'Our system provides real-time tracking, automated reporting, and user-friendly interfaces to manage your inventory effectively.',
    },
    {
        question: 'Is there a mobile app available?',
        answer: 'Yes, our inventory management system is fully responsive and can be accessed on mobile devices through any web browser.',
    },
    {
        question: 'How can I integrate the system with my existing tools?',
        answer: 'We offer API support for seamless integration with various third-party tools and platforms.',
    }
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`py-16 bg-gray-50`}>
            <div className={`container mx-auto px-6 text-center`}>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800 mb-8`}>Frequently Asked Questions</h2>
                <div className={`max-w-2xl mx-auto`}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`border-b border-gray-200 mb-4`}>
                            <button
                                className={`flex justify-between items-center w-full py-4 text-left focus:outline-none`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`font-semibold text-gray-700`}>{faq.question}</span>
                                <span className={`text-gray-500`}>{openIndex === index ? '-' : '+'}</span>
                            </button>
                            {openIndex === index && (<p className={`text-gray-600 mt-2`}>{faq.answer}</p>)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;