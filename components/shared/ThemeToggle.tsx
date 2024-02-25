"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [darkMode, setDarkMode] = useState(true);
	const [isActive] = useState<boolean | string | any>(darkMode);
	useEffect(() => {
		// Update localStorage whenever isActive changes
		localStorage.setItem("isActive", isActive);
	}, [isActive]);

	useEffect(() => {
		// Set the theme based on isActive when the component mounts
		setTheme(isActive ? "light" : "dark");
	}, [isActive, setTheme]);

	useEffect(() => {
		if (darkMode) {
			setDarkMode(true);
			localStorage.setItem("theme", "dark");
			setTheme("dark");
		} else {
			setDarkMode(false);
			localStorage.setItem("theme", "light");
			setTheme("light");
		}
	}, [darkMode, setTheme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="">
				<div
					onClick={() => {
						setDarkMode(!darkMode);
					}}
					className="themeSwitcher">
					<div
						className={`absolute ${
							!darkMode
								? "translate-left bg-yellow-400"
								: "translate-right bg-slate-300"
						}  transition-all duration-150 ease-in-out rounded-full w-[32px] h-[32px]`}>
						<p className="top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] absolute text-black">
							{!darkMode ? "S" : "M"}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
