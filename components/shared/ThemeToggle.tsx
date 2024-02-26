"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark";
export function ThemeToggle({
	theme,
	setThemes,
}: {
	theme: any;
	setThemes: any;
}) {
	const toggleTheme = () => {
		if (theme === "light") {
			setThemes("dark");
			setTheme("dark");
			window.localStorage.setItem("theme", "dark");
		} else {
			setThemes("light");
			setTheme("light");
			window.localStorage.setItem("theme", "light");
		}
	};
	const { setTheme } = useTheme();
	useEffect(() => {
		const localTheme = window.localStorage.getItem("theme") as Theme | null;

		if (localTheme) {
			setThemes(localTheme);
			setTheme(localTheme);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setThemes("dark");
			setTheme("dark");
		}
	}, [setThemes, setTheme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="">
				<div onClick={toggleTheme} className="themeSwitcher">
					<div
						className={`absolute ${
							theme === "light"
								? "translate-left bg-yellow-400"
								: "translate-right bg-slate-300"
						}  transition-all duration-150 ease-in-out rounded-full w-[32px] h-[32px]`}>
						<p className="top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] absolute text-black">
							{theme === "light" ? "S" : "M"}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
