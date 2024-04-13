"use client";

import { Menu, X } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import { SideBar } from "./SideBar";

const MobileSidebar = () => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4">
				<Menu className="size-8" />
			</SheetTrigger>

			<SheetContent side={"left"} className="w-full bg-[#212121]">
				<SideBar isMobile />
				<SheetClose>
					<h3 className="text-white absolute top-3 right-3 z-10">
						<X />
					</h3>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
};

export default MobileSidebar;
