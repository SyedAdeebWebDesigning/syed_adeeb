import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/components/shared/NavBar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className={`${inter.className}`}>
			<NavBar />
			<div className="overflow-x-hidden">{children}</div>
		</div>
	);
}
