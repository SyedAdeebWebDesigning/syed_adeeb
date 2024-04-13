import { AdminHeading } from "@/components/admin/AdminHeading";
import { DashboardCard } from "@/components/admin/DashboardCard";
import React from "react";

import { Home, Users } from "lucide-react";

const AdminPage = () => {
	const adminRoutes = [
		{
			href: "/admin/home-page-data",
			label: "Homepage",
		},
		{
			href: "/admin/timeline-data",
			label: "Timeline",
		},
		{
			href: "/admin/projects-data",
			label: "Projects",
		},
		{
			href: "/admin/skills-data",
			label: "Skills",
		},
		{
			href: "/admin/messages-data",
			label: "Messages",
		},
		{
			href: "/admin/users",
			label: "Users",
		},
	];
	return (
		<section className="grid-col-1">
			<AdminHeading>Admin Dashboard</AdminHeading>
			<div className="grid grid-cols-1 md:grid-cols-2 mt-4 w-full place-content-center gap-4">
				{adminRoutes.map((route) => (
					<DashboardCard
						key={route.href}
						title={route.label}
						href={route.href}
					/>
				))}
			</div>
		</section>
	);
};

export default AdminPage;
