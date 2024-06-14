"use client";
import { AdminHeading } from "@/components/admin/AdminHeading";
import ProjectPageForm from "@/components/admin/forms/ProjectPageForm";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const NewProjectPage = (props: Props) => {
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
				<AdminHeading>Create project data</AdminHeading>
				<ChevronLeft className="invisible" />
			</div>
			<ProjectPageForm />
		</main>
	);
};

export default NewProjectPage;
