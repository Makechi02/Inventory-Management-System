import 'animate.css/animate.min.css';
import "@/styles/globals.css";
import {figtree, gfs_didot} from "@/app/font";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
	title: "IMS",
	description: "A Inventory management system",
};

export default function RootLayout({children}) {
	return (
		<html lang="en" className={`${figtree} ${gfs_didot} font-figtree antialiased`}>
		<body>
		<main>
			{children}
			<ToastContainer transition={Zoom}/>
		</main>
		</body>
		</html>
	);
}
