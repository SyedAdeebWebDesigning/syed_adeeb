/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getProject } from "@/actions/projects.action";
import Bounded from "@/components/shared/Bounded";
import Heading from "@/components/shared/heading";
import { Projects } from "@prisma/client";
import React, { useEffect, useState } from "react";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const ProjectPage = ({ params }: { params: { id: string } }) => {
	const [project, setProject] = useState<Projects>();
	const [isLoading, setIsLoading] = useState(true);
	const fetchProject = async () => {
		try {
			const project: Projects | any = await getProject(params.id);
			setProject(project);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProject();
	}, [fetchProject]);

	return (
		<main>
			<Bounded>
				<Heading>{"PROJECT"}</Heading>
				{isLoading ? (
					<ProjectPageSkeleton />
				) : (
					<section className="body-font overflow-hidden">
						{project && (
							<div className="container px-5 lg:py-24 mx-auto">
								<div className="lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2">
									<div className="my-auto">
										<picture>
											<img
												alt=""
												className="w-full h-80 object-cover object-center rounded-xl my-auto"
												src={project?.imgUrl}
											/>
										</picture>
									</div>
									<div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
										<h2 className="text-[#202020] dark:text-[#e1e1e1] text-2xl lg:text-3xl font-semibold">
											{project.title}
										</h2>
										<p className="leading-relaxed text-sm text-[#282828] mt-2 dark:text-[#9f9f9f] line-clamp-[10]">
											<TextGenerateEffect
												words={project.description}
												className="md:text-sm"
											/>
										</p>
										<div>
											<Link href={project.link}>
												<Button className="w-full mt-4">View Project</Button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</section>
				)}
			</Bounded>
		</main>
	);
};

export default ProjectPage;

const ProjectPageSkeleton: React.FC = () => (
	<section className="body-font overflow-hidden">
		<div className="container px-5 lg:py-24 mx-auto">
			<div className="lg:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="my-auto dark:bg-[#2f2f2f] bg-gray-300 h-80 rounded-xl animate-pulse"></div>
				<div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
					<div className="h-8 dark:bg-[#2f2f2f] bg-gray-300 rounded w-3/4 mb-4 animate-pulse"></div>
					<div className="space-y-2">
						{[...Array(10)].map((_, index) => (
							<div
								key={index}
								className="h-4 dark:bg-[#2f2f2f] bg-gray-300 rounded w-full animate-pulse"></div>
						))}
					</div>
					<div className="w-full mt-4 h-10 dark:bg-[#2f2f2f] bg-gray-300 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	</section>
);
