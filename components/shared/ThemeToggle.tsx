"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
	const { setTheme } = useTheme();
	const [isActive, setIsActive] = useState<boolean | string | any>(() => {
		// Retrieve the isActive value from localStorage or default to true
		return localStorage.getItem("isActive") === "false" ? false : true;
	});

	useEffect(() => {
		// Update localStorage whenever isActive changes
		localStorage.setItem("isActive", isActive);
	}, [isActive]);

	useEffect(() => {
		// Set the theme based on isActive when the component mounts
		setTheme(isActive ? "light" : "dark");
	}, [isActive, setTheme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="">
				<div
					onClick={() => {
						setIsActive(!isActive);
					}}
					className="themeSwitcher">
					<div
						className={`absolute ${
							isActive
								? "translate-left bg-yellow-400"
								: "translate-right bg-slate-200"
						}  transition-all duration-150 ease-in-out rounded-full w-[32px] h-[32px]`}>
						<p className="top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] absolute text-black">
							{isActive ? "S" : "M"}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
