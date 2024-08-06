"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	getFeaturedProject,
	getNonFeaturedProjects,
} from "@/actions/projects.action";
import { FollowerPointerCard } from "../ui/following-pointer";

import Link from "next/link";
import { Projects as ProjectType } from "@prisma/client";
import Image from "next/image";

import { X } from "lucide-react";
// Individual project component
const ProjectCard: React.FC<{
	project: ProjectType;
	index: number;
	onClick: () => void;
}> = ({ project, index, onClick }) => {
	return (
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
				}}
				onClick={onClick}>
				<div className="cursor-none">
					<picture>
						<img
							src={project.imgUrl} // Make sure this path is correct
							alt={project.title}
							className={`rounded-lg w-full ${
								index === 0 ? "h-full" : "h-48"
							} object-cover object-center`}
						/>
					</picture>
				</div>
			</motion.div>
		</FollowerPointerCard>
	);
};

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
	const [isActive, setIsActive] = useState(false);
	const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
	const modalRef = useRef<HTMLDivElement | null>(null);

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

	const handleProjectClick = (project: ProjectType) => {
		setActiveProject(project);
		setIsActive(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsActive(false);
		}
	};

	useEffect(() => {
		if (isActive) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isActive]);

	return (
		<div className={`relative`}>
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
								<ProjectCard
									project={featuredProject}
									index={0}
									onClick={() => handleProjectClick(featuredProject)}
								/>
							</div>
						)}

						{/* Render non-featured projects */}
						{nonFeaturedProjects.map((project, index) => {
							return (
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
									<ProjectCard
										project={project}
										index={index + 1}
										onClick={() => handleProjectClick(project)}
									/>
								</div>
							);
						})}
					</>
				)}
			</div>
			<AnimatePresence>
				{isActive && activeProject && (
					<>
						<motion.div
							className="fixed inset-0 bg-black bg-opacity-50 z-40"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>

						<Link href={activeProject.link}>
							<motion.div
								className="fixed inset-0 m-auto w-[90vw] md:w-[70vw] lg:w-[50vw] h-[70vh] md:h-[60vh] lg:h-[50vh] rounded-2xl shadow-lg bg-cover bg-center z-50"
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								ref={modalRef}>
								<div className="relative flex items-end h-full w-full	">
									<Image
										src={activeProject.imgUrl}
										fill
										alt=""
										className=""
										objectFit="cover"
									/>
									<div className=" z-0 top-2 right-2 md:hidden">
										<button onClick={() => setIsActive(false)}>
											<X size={30} />
										</button>
									</div>
								</div>
								<div className="w-full p-4 bg-[#1c1c1c] rounded-b-2xl">
									<motion.h2
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{
											scale: 1,
											opacity: 1,
											transition: {
												delay: 0.5,
												type: "spring",
												stiffness: 50,
												damping: 10,
											},
										}}
										exit={{ scale: 0.8, opacity: 0 }}
										className="font-bold text-white text-2xl uppercase line-clamp-1"
										style={{ textShadow: "2px 2px 10px black" }}>
										{activeProject.title}
									</motion.h2>
									<motion.p
										initial={{ scale: 0.8, opacity: 0 }}
										animate={{
											scale: 1,
											opacity: 1,
											transition: {
												delay: 0.8,
												type: "spring",
												stiffness: 50,
												damping: 10,
											},
										}}
										exit={{ scale: 0.8, opacity: 0 }}
										className="text-gray-100 text-lg line-clamp-3"
										style={{ textShadow: "1px 1px 1px black" }}>
										{activeProject.description}
									</motion.p>
								</div>
							</motion.div>
						</Link>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Projects;
