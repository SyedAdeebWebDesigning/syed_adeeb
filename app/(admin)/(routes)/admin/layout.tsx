import { AdminHeader } from "@/components/admin/Header";
import { SideBar } from "@/components/admin/SideBar";
import Bounded from "@/components/shared/Bounded";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main
			className="grid grid-cols-1 md:grid-cols-[2fr,7fr] gap-4"
			suppressHydrationWarning={true}>
			<div className="md:col-span-1">
				<AdminHeader />
				<div className="md:block hidden">
					<SideBar />
				</div>
			</div>
			<Bounded className="">
				<div className="">{children}</div>
			</Bounded>
		</main>
	);
};

export default AdminLayout;
