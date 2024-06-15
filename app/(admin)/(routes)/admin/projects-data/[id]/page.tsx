"use client";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { ChevronLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProject } from "@/actions/projects.action";
import { Projects } from "@prisma/client";
import ProjectUpdatePageForm from "@/components/admin/forms/UpdateProjectPageForm";

type Props = {};

const UpdateProjectPage = (props: Props) => {
	const router = useRouter();
	const { id } = useParams(); // Use useParams to get the project ID from the URL
	const [projectData, setProjectData] = useState<Projects | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchProjectData = async () => {
		try {
			const data: Projects | any = await getProject(id.toString());
			setProjectData(data);
		} catch (error) {
			console.error("Error fetching project data:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (id) {
			fetchProjectData();
		}
	}, [fetchProjectData, id]);

	return (
		<main>
			<div className="flex items-center justify-between">
				<ChevronLeft
					className="size-9 hover:bg-gray-100 hover:text-gray-700 p-1 rounded-full transition-all duration-300 ease-in-out cursor-pointer"
					onClick={() => {
						router.back();
					}}
				/>
				<AdminHeading>Update project data</AdminHeading>
				<ChevronLeft className="invisible" />
			</div>
			{loading ? (
				<p>Loading...</p>
			) : projectData ? (
				<ProjectUpdatePageForm projectId={id.toLocaleString()} />
			) : (
				<p>Project not found.</p>
			)}
		</main>
	);
};

export default UpdateProjectPage;
