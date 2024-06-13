"use client";
import { AdminHeading } from "@/components/admin/AdminHeading";
import TimelinePageForm from "@/components/admin/forms/TimelinePageForm";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const NewTimelinePage = (props: Props) => {
	const router = useRouter();
	return (
		<main>
			<div className="flex items-center justify-between">
				<ChevronLeft
					className="size-9 hover:bg-gray-100 hover:text-gray-700 p-1 rounded-full transition-all duration-300 ease-in-out cursor-pointer"
					onClick={() => {
						router.back();
					}}
				/>
				<AdminHeading>Create timeline data</AdminHeading>
				<ChevronLeft className="invisible" />
			</div>
			<TimelinePageForm />
		</main>
	);
};

export default NewTimelinePage;
