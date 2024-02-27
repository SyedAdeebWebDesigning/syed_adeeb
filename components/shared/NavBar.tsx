"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMenu } from "react-icons/tb";
import { NavLinks } from "@/lib/links";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

type Theme = "light" | "dark";
const NavBar = () => {
	const [theme, setThemes] = useState<Theme>("light");
	// Function to determine the appropriate logo based on the theme
	const getLogoSource = () => {
		return theme === "light" ? "/logoBlack.png" : "/logoWhite.png";
	};

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
					<Image
						src={getLogoSource()} // Dynamically set the source based on the theme
						alt="Syed Adeeb"
						layout="fill"
						objectFit="contain"
						className="mx-4 cursor-pointer hover:animate-pulse"
					/>
				</motion.div>

				<nav className="">
					<motion.ul
						className="items-center justify-center space-x-20 text-lg hidden lg:flex"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}>
						{NavLinks.map((link, i) => (
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
								<Link
									href={link.url}
									className="link link-underline link-underline-black">
									{link.title}
								</Link>
							</motion.li>
						))}
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
					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger>
								<TbMenu className="text-4xl mr-2" />
							</SheetTrigger>
							<SheetContent className="bg-white/90 backdrop-blur-md dark:bg-[#1c1c1c]">
								<ul>
									{NavLinks.map((link) => (
										<li key={link.title}>
											<Link
												href={link.url}
												className="link link-underline link-underline-black my-10 flex flex-col">
												{link.title}
											</Link>
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