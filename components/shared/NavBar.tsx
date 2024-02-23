"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMenu } from "react-icons/tb";
import { NavLinks } from "@/lib/links";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

type Props = {};

const NavBar = (props: Props) => {
	return (
		<header className="mt-5">
			<section className="flex mx-2 sm:mx-10 md:mx-20 xl:mx-40 my-2 justify-between items-center rounded-full">
				<Image
					src={"/logo.png"}
					alt="Syed Adeeb"
					width={200}
					height={100}
					objectFit="contain"
					className="mx-4"
				/>

				<nav className="items-center justify-center space-x-20 text-lg hidden lg:flex">
					{NavLinks.map((link) => (
						<Link
							key={link.title}
							href={link.url}
							className="link link-underline link-underline-black">
							{link.title}
						</Link>
					))}
				</nav>
				<div className="flex items-center justify-center space-x-2">
					<div className=" mx-4">
						<ThemeToggle />
					</div>
					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger>
								<TbMenu className="text-4xl" />
							</SheetTrigger>
							<SheetContent className="bg-white/90 backdrop-blur-md ">
								{NavLinks.map((link) => (
									<Link
										key={link.title}
										href={link.url}
										className="link link-underline link-underline-black my-10 flex flex-col">
										{link.title}
									</Link>
								))}
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</section>
		</header>
	);
};

export default NavBar;
