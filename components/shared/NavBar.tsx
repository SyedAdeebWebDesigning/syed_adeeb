"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TbMenu } from "react-icons/tb";
import { NavLinks } from "@/lib/links";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";
import { findEmailInToken } from "@/lib/utils";
import { getUserByEmail } from "@/actions/user.action";

type Theme = "light" | "dark";
const NavBar = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token: any = localStorage.getItem("token");
		const email: any = findEmailInToken(token);
		if (!email) {
			window.location.href = "/sign-in";
			return;
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
	const [theme, setThemes] = useState<Theme>("light");
	// Function to determine the appropriate logo based on the theme
	const getLogoSource = () => {
		return theme === "light" ? "/logoBlack.png" : "/logoWhite.png";
	};

	const pathname = usePathname();

	return (
		<header className="mt-5">
			<section className="flex mx-2 sm:mx-10 md:mx-20 xl:mx-40 my-2 justify-between items-center rounded-full">
				<motion.div
					className="relative w-[150px] h-[100px] sm:w-[200px] sm:h-[100px]"
					initial={{ x: -100, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { type: "spring", stiffness: 150, damping: 7 },
					}}>
					<Link href={"/"}>
						<Image
							src={getLogoSource()} // Dynamically set the source based on the theme
							alt="Syed Adeeb"
							layout="fill"
							objectFit="contain"
							className="mx-4 cursor-pointer hover:animate-pulse"
						/>
					</Link>
				</motion.div>

				<nav className="">
					<motion.ul
						className="items-center justify-center space-x-20 text-lg hidden min-[1425px]:flex"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						{NavLinks.map((link, i) => {
							return (
								<motion.li
									key={link.title}
									initial={{ y: 100, opacity: 0 }}
									animate={{
										y: 0,
										opacity: 1,
									}}
									transition={{
										duration: 0.5,
										delay: i * 0.1, // Staggering delay for each link
										type: "spring",
										stiffness: 150,
										damping: 10,
									}}>
									{user?.isAdmin || !link.adminOnly ? (
										<Link
											prefetch
											href={link.url}
											className={`link link-underline link-underline-black dark:link-underline-white font-semibold dark:font-normal transition-all duration-300 ease-in-out  ${
												pathname === `/${link.title.toLowerCase()}`
													? "bg-gradient-to-tr link-underline-active dark:link-underline-white-active  dark:from-emerald-300 dark:to-emerald-300 dark:bg-emerald-600 from-emerald-600 to-emerald-500 bg-emerald-500"
													: ""
											}`}>
											{link.title}
										</Link>
									) : null}
								</motion.li>
							);
						})}
					</motion.ul>
				</nav>
				<motion.div
					className="flex items-center justify-center space-x-2"
					initial={{ x: 100, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { type: "spring", stiffness: 150, damping: 7 },
					}}>
					<motion.div className="ml-4 cursor-pointer">
						<ThemeToggle setThemes={setThemes} theme={theme} />
					</motion.div>
					<div className="min-[1425px]:hidden">
						<Sheet>
							<SheetTrigger>
								<TbMenu className="text-4xl mr-2" />
							</SheetTrigger>
							<SheetContent className="bg-white/90 backdrop-blur-md dark:bg-[#1c1c1c]">
								<ul>
									{NavLinks.map((link) => (
										<li key={link.title}>
											<a
												href={link.url}
												className={`link link-underline link-underline-black my-10 flex flex-col ${
													pathname === `/${link.title.toLowerCase()}`
														? "bg-gradient-to-tr dark:from-emerald-300 dark:to-emerald-300 dark:bg-emerald-300 from-emerald-500 to-emerald-500 bg-emerald-500"
														: ""
												}`}>
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</SheetContent>
						</Sheet>
					</div>
				</motion.div>
			</section>
		</header>
	);
};

export default NavBar;
