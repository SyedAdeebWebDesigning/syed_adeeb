"use client";

import { deleteProject, getProjects } from "@/actions/projects.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import { Projects } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck, ChevronRightCircle, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

type Props = {};

const ProjectPage = (props: Props) => {
	const [projectData, setProjectData] = useState<Projects[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [skeletonCount, setSkeletonCount] = useState<number>(0);

	const fetchData = async () => {
		try {
			const data: Projects[] | undefined = await getProjects();
			if (data) {
				setProjectData(data);
				setSkeletonCount(data.length); // Update skeleton count based on actual data
			} else {
				setProjectData([]);
				setSkeletonCount(0); // Update to 0 if no data
			}
		} catch (error) {
			console.error("Error fetching project data:", error);
			setProjectData([]);
			setSkeletonCount(0); // Update to 0 on error
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<AdminHeading>Projects Data </AdminHeading>
			{loading ? (
				<section>
					<div className="max-h-[75vh] w-full mx-auto overflow-y-auto p-4 pr-0">
						{/* Render skeletons to represent loading state */}
						{Array.from({ length: 6 }).map((_, index) => (
							<ProjectSkeleton key={index} />
						))}
					</div>
				</section>
			) : projectData && projectData.length > 0 ? (
				<section>
					<div className="max-h-[75vh] w-full mx-auto overflow-y-auto p-4 pr-0">
						{projectData.map((project, index) => {
							const deleteThisProject = async () => {
								await deleteProject(project.id);
								fetchData();
							};
							return (
								<div
									key={project.id}
									className="block w-full relative bg-white rounded-lg shadow-md border-gray-200 dark:bg-[#363636] dark:hover:bg-[#262626] mb-4">
									<div className="absolute right-2 top-2 p-2 cursor-pointer">
										<Trash2
											className="bg-red-300 text-white rounded-full size-10 p-2 hover:scale-110"
											onClick={() => deleteThisProject()}
										/>
									</div>
									<Link
										href={`/admin/projects-data/${project.id}`}
										className="absolute right-14 top-2 p-2 cursor-pointer">
										<ChevronRightCircle
											className="bg-blue-300 text-white rounded-full size-10 p-2 hover:scale-110"
											onClick={() => deleteThisProject}
										/>
									</Link>
									<div className="flex items-center p-4">
										<div className="relative h-24 w-32 rounded-lg overflow-hidden mr-4">
											<Image
												src={project.imgUrl}
												layout="fill"
												objectFit="cover"
												alt=""
											/>
										</div>
										<div className="flex-1">
											<h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
												{index + 1}.
												<p className="line-clamp-1 lg:line-clamp-2 ml-1">
													{project.title}
												</p>
												{project.isFeatured && (
													<BadgeCheck
														className="text-green-500 ml-2"
														size={24}
													/>
												)}
											</h2>
											<p className="text-gray-700 dark:text-gray-300 line-clamp-2">
												{project.description}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			) : (
				<HandleNoData
					title="No project data"
					buttonText="Add new project data"
					link="/admin/projects-data/new"
				/>
			)}
		</main>
	);
};

const ProjectSkeleton = () => {
	return (
		<div className="block w-full bg-white rounded-lg shadow-md border-gray-200 dark:bg-[#363636] mb-4">
			<div className="flex items-center p-4 animate-pulse">
				<div className="relative h-24 w-32 rounded-lg overflow-hidden bg-gray-300 dark:bg-[#222222] mr-4"></div>
				<div className="flex-1">
					<div className="h-6 bg-gray-300 dark:bg-[#222222] rounded w-3/4 mb-2"></div>
					<div className="h-4 bg-gray-300 dark:bg-[#222222] rounded w-1/2"></div>
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;
