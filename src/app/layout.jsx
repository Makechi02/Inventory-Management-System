import "@/styles/globals.css";
import {figtree, gfs_didot} from "@/app/font";

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
		</main>
		</body>
		</html>
	);
}
