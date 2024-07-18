import "@/styles/globals.css";

export const metadata = {
	title: "IMS",
	description: "A Inventory management system",
};

export default function RootLayout({children}) {
	return (
		<html lang="en" className={`antialiased`}>
		<body>
		<main>
			{children}
		</main>
		</body>
		</html>
	);
}
