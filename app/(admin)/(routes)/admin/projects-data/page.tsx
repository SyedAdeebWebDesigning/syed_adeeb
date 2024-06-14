"use client";

import { getProjects } from "@/actions/projects.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import { Projects } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";

type Props = {};

const ProjectPage = (props: Props) => {
	const [projectData, setProjectData] = useState<Projects[]>();

	const fetchData = async () => {
		try {
			const data: Projects[] | undefined = await getProjects();
			if (data) {
				setProjectData(data);
			}
		} catch (error) {
			console.error("Error fetching project data:", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<AdminHeading>Projects Data</AdminHeading>
			{projectData && projectData.length > 0 ? (
				<section>
					<div className="max-h-[85vh] w-full mx-auto overflow-y-auto p-4 pr-0">
						{projectData.map((project, index) => (
							<Link
								href={`/admin/projects-data/${project.id}`}
								key={project.id}
								className="block w-full bg-white rounded-lg shadow-md  border-gray-200 dark:bg-[#363636] dark:hover:bg-[#262626] mb-4">
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
											{index + 1}.{" "}
											<p className="line-clamp-1 lg:line-clamp-2 ml-1">
												{project.title}
											</p>
											{project.isFeatured && (
												<BadgeCheck className="text-green-500 ml-2" size={24} />
											)}
										</h2>
										<p className="text-gray-700 dark:text-gray-300 line-clamp-2">
											{project.description}
										</p>
									</div>
								</div>
							</Link>
						))}
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

export default ProjectPage;
