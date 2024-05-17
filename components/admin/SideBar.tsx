"use client";
import { getUserByEmail } from "@/actions/user.action";
import { cn, findEmailInToken } from "@/lib/utils";
import { User } from "@prisma/client";
import {
	LayoutDashboardIcon,
	Home,
	Users,
	Timer,
	Folder,
	Package2,
	MessageSquare,
	Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "../ui/use-toast";

export const SideBar = ({ isMobile }: { isMobile?: boolean }) => {
	const pathname = usePathname();
	const routes = [
		{
			href: "/admin",
			label: "Admin",
			icon: LayoutDashboardIcon,
		},
		{
			href: "/admin/home-page-data",
			label: "Homepage",
			icon: Home,
		},
		{
			href: "/admin/about-data",
			label: "About",
			icon: Info,
		},
		{
			href: "/admin/timeline-data",
			label: "Timeline",
			icon: Timer,
		},
		{
			href: "/admin/projects-data",
			label: "Projects",
			icon: Folder,
		},
		{
			href: "/admin/skills-data",
			label: "Skills",
			icon: Package2,
		},
		{
			href: "/admin/messages-data",
			label: "Messages",
			icon: MessageSquare,
		},
		{
			href: "/admin/users",
			label: "Users",
			icon: Users,
		},
	];

	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token: any = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/sign-in";
			return;
		}

		const email: any = findEmailInToken(token);
		if (!email) {
			toast({ description: "User not signed in", variant: "default" });
		}

		const fetchUser = async () => {
			try {
				const userData = await getUserByEmail(email);
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user:", error);
				// Handle error as needed, e.g., redirect to sign-in page
				window.location.href = "/sign-in";
			}
		};

		fetchUser();
	}, []);

	if (user?.isAdmin === false) {
		toast({
			description: "You are not allowed to access this page",
			variant: "destructive",
		});
		setTimeout(() => {
			window.location.href = "/";
		}, 2000);
	}

	return (
		<div
			className={cn(
				"col-span-1  h-screen",
				isMobile === true ? "" : "bg-[#282828] border-r-2 border-white/10"
			)}>
			<div className="space-y-4 flex h-full text-primary">
				<div className="p-3 flex-1 justify-start flex">
					<div className="space-y-2 w-full">
						<Link href={"/"} className="flex justify-center mb-10">
							<Image
								src={"/logoWhite.png"} // Dynamically set the source based on the theme
								alt="Syed Adeeb"
								width={200}
								height={100}
								objectFit="contain"
								className="mx-4 cursor-pointer hover:animate-pulse"
							/>
						</Link>

						<div className="w-full p-3 bg-gradient-to-r from-teal-100 to-emerald-100 cursor-pointer flex items-center hover:bg-primary/10 rounded-lg text-secondary space-x-2">
							<Avatar className="">
								<AvatarImage src={user?.imgUrl} />
							</Avatar>
							<div>
								<h3 className="text-gray-800">
									{user?.firstName} {user?.lastName}
								</h3>
								<h3 className="text-gray-600">{user?.email}</h3>
							</div>
						</div>

						{routes.map((route) => (
							<Link
								href={route.href}
								key={route.href}
								className={cn(
									"group flex p-3 w-full justify-start font-medium mt-5 bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
									pathname === route.href
										? "bg-gradient-to-r text-gray-700 from-teal-500 to-emerald-500"
										: ""
								)}>
								<div className="flex gap-x-2 items-center flex-1 text-gray-50">
									<route.icon className="size-6" />
									<p className="text-md flex flex-col ">
										{route.label}
										<span className="text-xs text-gray-100">{route.href}</span>
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
