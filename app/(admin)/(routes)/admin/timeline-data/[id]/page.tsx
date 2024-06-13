"use client";
import { AdminHeading } from "@/components/admin/AdminHeading";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import TimelinePageUpdateForm from "@/components/admin/forms/TimelinePageUpdateForm";

type Props = {};

const UpdateTimelinePage = ({ params }: { params: { id: string } }) => {
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
				<AdminHeading>Update timeline data</AdminHeading>

				<ChevronLeft className="invisible" />
			</div>
			<TimelinePageUpdateForm id={params.id} />
		</main>
	);
};

export default UpdateTimelinePage;
