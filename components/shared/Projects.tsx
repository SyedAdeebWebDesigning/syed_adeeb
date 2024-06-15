"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	getFeaturedProject,
	getNonFeaturedProjects,
} from "@/actions/projects.action";
import { FollowerPointerCard } from "../ui/following-pointer";

import Link from "next/link";
import { Projects as ProjectType } from "@prisma/client";
import Image from "next/image";

// Individual project component
const ProjectCard: React.FC<{ project: ProjectType; index: number }> = ({
	project,
	index,
}) => (
	<FollowerPointerCard
		title={
			<TitleComponent title={project.title} avatar={"/about-data.webp"} />
		}>
		<motion.div
			className="p-1 rounded-lg shadow-md h-full"
			initial={{ scale: 0, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{
				delay: index * 0.2,
				type: "spring",
				stiffness: 50,
				damping: 10,
			}}>
			<Link href={`/projects/${project.id}`} className="cursor-none">
				<picture>
					<img
						src={project.imgUrl} // Make sure this path is correct
						alt={project.title}
						className={`rounded-lg w-full ${
							index === 0 ? "h-full" : "h-48"
						} object-cover object-center`}
					/>
				</picture>
			</Link>
		</motion.div>
	</FollowerPointerCard>
);

const TitleComponent = ({
	title,
	avatar,
}: {
	title: string;
	avatar: string;
}) => (
	<div className="flex space-x-2 items-center backdrop-blur-xl text-2xl bg-gradient-to-r from-teal-500/60 to-green-500/60 px-2 py-1 rounded-full">
		<Image
			src={avatar}
			height="20"
			width="20"
			alt="thumbnail"
			className="rounded-full border-2 border-white"
		/>
		<p className="shadow-xl">{title}</p>
	</div>
);

const ProjectCardSkeleton: React.FC<{ index: number }> = ({ index }) => (
	<div className="p-1 rounded-lg shadow-md h-full animate-pulse bg-gray-200 dark:bg-[#232323]">
		<div
			className={`rounded-lg w-full ${
				index === 0 ? "h-full" : "h-48"
			} bg-gray-300 dark:bg-[#2f2f2f]`}
		/>
	</div>
);

// Projects component to display the Bento grid
const Projects: React.FC = () => {
	const [featuredProject, setFeaturedProject] = useState<ProjectType | null>(
		null
	);
	const [nonFeaturedProjects, setNonFeaturedProjects] = useState<ProjectType[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProjectData();
	}, []);

	const fetchProjectData = async () => {
		try {
			// Fetch featured project data
			const featuredProjectData = await getFeaturedProject();
			setFeaturedProject(featuredProjectData);

			// Fetch non-featured projects data
			const nonFeaturedProjectsData = await getNonFeaturedProjects();
			setNonFeaturedProjects(nonFeaturedProjectsData);
		} catch (error) {
			console.error("Error fetching project data:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
			{/* Render skeletons or projects */}
			{isLoading ? (
				<>
					{[...Array(1)].map((_, index) => (
						<div
							key={`skeleton-featured-${index}`}
							className="md:col-span-3 lg:col-span-2 row-span-3 mb-6 sm:mb-0 h-full">
							<ProjectCardSkeleton index={index} />
						</div>
					))}
					{[...Array(8)].map((_, index) => (
						<div
							key={`skeleton-${index}`}
							className={`${
								index === 4 ? "md:col-span-1 lg:col-span-2" : ""
							}  ${
								index === 5 ? "md:col-span-1 lg:col-span-2" : ""
							} mb-6 sm:mb-0 h-full`}>
							<ProjectCardSkeleton index={index + 1} />
						</div>
					))}
				</>
			) : (
				<>
					{/* Render featured project at index 0 */}
					{featuredProject && (
						<div
							key={featuredProject.id}
							className="md:col-span-3 lg:col-span-2 row-span-3 mb-6 sm:mb-0 h-full">
							<ProjectCard project={featuredProject} index={0} />
						</div>
					)}

					{/* Render non-featured projects */}
					{nonFeaturedProjects.map((project, index) => (
						<div
							key={project.id}
							className={`${
								index === nonFeaturedProjects.length - 2
									? "md:col-span-1 lg:col-span-2"
									: ""
							}  ${
								index === nonFeaturedProjects.length - 1
									? "md:col-span-1 lg:col-span-2"
									: ""
							} mb-6 sm:mb-0 h-full`}>
							<ProjectCard project={project} index={index + 1} />
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Projects;
