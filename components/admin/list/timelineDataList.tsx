"use client";
import React from "react";

type Props = {
	title: string;
	desc: string;
	date: string;
	index: number;
	id: string;
};

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteTimelineItem } from "@/actions/timeline.action";
import { toast } from "@/components/ui/use-toast";

const TimelineDataList = ({ title, desc, date, index, id }: Props) => {
	const router = useRouter();

	const handleDelete = async (id: string) => {
		try {
			await deleteTimelineItem(id);
		} catch (error) {
			toast({ description: "Failed to delete", variant: "destructive" });
		} finally {
			toast({ description: "Successfully deleted", variant: "default" });
			window.location.reload();
		}
	};

	return (
		<div className="bg-slate-400/30 my-2 sm:w-1/2 mx-auto px-4 py-2 rounded-full flex items-center relative">
			<div
				className="pr-6 cursor-pointer"
				onClick={() => router.push(`/admin/timeline-data/${id}`)}>
				<div className="flex justify-start items-center">
					<h1 className="line-clamp-1">
						{index + 1}. {title}
					</h1>
					<h1 className="text-sm dark:text-gray-300 text-gray-600 line-clamp-1 ml-2">
						{date}
					</h1>
				</div>
				<p className="text-sm line-clamp-1 text-gray-700 dark:text-gray-300">
					{desc}
				</p>
			</div>
			<div
				className="ml-auto absolute right-2 bg-red-500/50 dark:bg-red-700/70 rounded-full size-10 items-center justify-center flex cursor-pointer"
				onClick={() => handleDelete(id)}>
				<Trash2 />
			</div>
		</div>
	);
};

export default TimelineDataList;
