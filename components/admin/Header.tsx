"use client";

import { usePathname } from "next/navigation";

import MobileSidebar from "./MobileSidebar";

export const AdminHeader = () => {
	const pathname = usePathname();
	return (
		<header className="md:hidden flex justify-between items-center my-2 ml-4">
			<MobileSidebar />
			<h3 className="absolute right-2 uppercase">{pathname}</h3>
		</header>
	);
};
