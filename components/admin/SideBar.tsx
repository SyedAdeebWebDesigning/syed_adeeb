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
	LogOut,
	CornerDownRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

// Define the SideBar component
export const SideBar = ({ isMobile }: { isMobile?: boolean }) => {
	// Define state variables
	const [user, setUser] = useState<User | null>(null);
	const [activeExtra, setActiveExtra] = useState<string | null>(null);

	const pathname = usePathname(); // Get the current pathname

	// useEffect hook to fetch user data
	useEffect(() => {
		const token: any = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/";
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
				window.location.href = "/";
			}
		};

		fetchUser();
	}, []);

	// Handle logout function
	const handleLogout = () => {
		localStorage.removeItem("token");
		toast({ description: "Logged out successfully", variant: "default" });
		window.location.href = "/";
	};

	// Function to toggle active state of the extra links
	const toggleActiveLink = (href: string) => {
		setActiveExtra((prevActiveLink) => (prevActiveLink === href ? null : href));
	};

	// Define the routes
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
			extra: [
				{
					href: "/admin/timeline-data/new",
					label: "New",
				},
			],
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

	return (
		<div
			className={cn(
				"col-span-1 h-screen",
				isMobile === true ? "" : "bg-[#282828] border-r-2 border-white/10"
			)}>
			<div className="flex flex-col h-full text-primary justify-between">
				<div className="space-y-4 p-3 flex-1">
					<div className="space-y-2 w-full items-center">
						{/* Logo */}
						<Link href={"/"} className="flex justify-center mb-10">
							<Image
								src={"/logoWhite.png"}
								alt="Syed Adeeb"
								width={200}
								height={100}
								objectFit="contain"
								className="mx-4 cursor-pointer hover:animate-pulse"
							/>
						</Link>

						{/* User Info */}
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

						{/* Sidebar Links */}
						{routes.map((route, i) => (
							<motion.div
								key={route.href}
								initial={{ x: -10, opacity: 0, scale: 1.2 }}
								animate={{
									scale: 1,
									x: 0,
									opacity: 1,
								}}
								transition={{
									duration: 0.5,
									delay: i * 0.1, // Staggering delay for each link
									type: "spring",
									stiffness: 150,
									damping: 7,
								}}>
								{/* Parent Link */}
								<div className="relative">
									<Link
										href={route.href}
										className={cn(
											"group flex p-3 w-full justify-start font-medium mt-5 bg-gradient-to-r hover:from-teal-500 hover:to-transparent cursor-pointer hover:text-primary  rounded-lg transition",
											pathname === route.href ||
												activeExtra === route.href ||
												(route.extra &&
													route.extra.some(
														(subroute) => pathname === subroute.href
													))
												? "bg-gradient-to-r text-gray-700 from-teal-500 to-transparent"
												: ""
										)}>
										<div className="flex gap-x-2 items-center flex-1 text-gray-50">
											<route.icon className="size-6" />
											<p className="text-md flex flex-col ">
												{route.label}
												<span className="text-xs text-gray-100">
													{route.href}
												</span>
											</p>
										</div>
									</Link>

									{/* Extra Subroutes */}
									{pathname.startsWith(route.href) &&
										route.extra &&
										route.extra.map((subroute) => (
											<Link
												href={subroute.href}
												key={subroute.href}
												className={cn(
													"group flex p-2 w-full justify-start font-medium mt-1 ml-10 cursor-pointer hover:text-primary bg-gradient-to-r hover:from-teal-500/40 hover:via-transparent rounded-lg transition",
													pathname === subroute.href
														? "bg-gradient-to-r text-gray-700 from-teal-500 via-transparent to-transparent"
														: ""
												)}>
												<motion.div
													initial={{ y: -1, opacity: 0 }}
													animate={{
														y: 0,
														opacity: 1,
														transition: {
															type: "spring",
															stiffness: 150,
															damping: 7,
														},
													}}
													className="text-sm flex text-gray-50 items-center">
													<CornerDownRight />
													<p className="ml-2 mt-1">{subroute.label}</p>
												</motion.div>
											</Link>
										))}
								</div>
							</motion.div>
						))}
					</div>
				</div>
				{/* Logout Button */}

				<div className="p-3 my-5">
					<Button
						variant={"destructive"}
						onClick={handleLogout}
						className="flex p-3 w-full justify-start font-medium mt-5 cursor-pointer rounded-lg transition">
						<LogOut className="size-6 mr-2 " />
						<p className="text-md flex flex-col text-gray-50">Logout</p>
					</Button>
				</div>
			</div>
		</div>
	);
};
