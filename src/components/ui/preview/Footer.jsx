import Link from "next/link";

const Footer = () => {
    return (
        <footer className={`bg-gray-800 text-white py-6`}>
            <div className={`container mx-auto px-6 text-center`}>
                <div className={`mb-4`}>
                    <h4 className={`text-lg font-semibold`}>Quick Links</h4>
                    <ul className="space-y-2 mt-2">
                        <li>
                            <Link href={`/about`} className={`text-gray-400 hover:text-white`}>About Us</Link>
                        </li>
                        <li>
                            <Link href={`/features`} className={`text-gray-400 hover:text-white`}>Features</Link>
                        </li>
                        <li>
                            <Link href={`/contact`} className={`text-gray-400 hover:text-white`}>Contact</Link>
                        </li>
                        <li>
                            <Link href={`/privacy`} className={`text-gray-400 hover:text-white`}>Privacy Policy</Link>
                        </li>
                    </ul>
                </div>
                <div className={`mb-4`}>
                    <h4 className={`text-lg font-semibold`}>Contact Us</h4>
                    <p className={`text-gray-400`}>
                        Email: <a href="mailto:makechieric9@gmail.com" className={`hover:text-white`}>info@ims.com</a>
                    </p>
                    {/*<p className="text-gray-400">Phone: +254 700 000 000</p>*/}
                </div>
                <p className={`text-gray-400 text-sm`}>&copy; {new Date().getFullYear()} Makechi Eric. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
