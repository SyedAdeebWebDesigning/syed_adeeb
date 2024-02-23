"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MdSunny } from "react-icons/md";
import { HiMoon } from "react-icons/hi2";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
	const { useState } = React;
	const { theme, setTheme } = useTheme();
	const [isActive, setIsActive] = useState(true);
	if (isActive) {
		setTheme("light");
	} else {
		setTheme("dark");
	}

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
						}  transition-all duration-150 ease-in-out rounded-full w-8 h-8`}>
						<p className="top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] absolute text-black">
							{isActive ? "S" : "M"}
						</p>
					</div>
				</div>
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
