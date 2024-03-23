"use client";
import React from "react";
import { projects } from "@/lib/links";
import { motion } from "framer-motion";

// Define the type for each project
interface Project {
	id: number;
	title: string;
	description: string;
	imageUrl: string;
}

// Individual project component
const ProjectCard: React.FC<{ project: Project; index: number }> = ({
	project,
	index,
}) => (
	<motion.div
		className=" p-1 rounded-lg shadow-md h-full"
		initial={{ scale: 0, opacity: 0 }}
		animate={{ scale: 1, opacity: 1 }}
		transition={{
			delay: index * 0.2,
			type: "spring",
			stiffness: 50,
			damping: 10,
		}}>
		<picture>
			<img
				src={project.imageUrl}
				alt={project.title}
				className={`rounded-lg w-full ${
					index === 0 ? "h-full" : "h-48"
				} object-cover object-center`}
			/>
		</picture>
	</motion.div>
);

// Projects component to display the Bento grid
const Projects: React.FC = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{projects.map((project, index) => (
				<div
					key={project.id}
					className={`${
						index === 0 ? "md:col-span-3 lg:col-span-2 row-span-3 " : ""
					} ${
						index === projects.length - 2 ? "md:col-span-1 lg:col-span-2" : ""
					}  ${
						index === projects.length - 1 ? "md:col-span-1 lg:col-span-2" : ""
					} mb-6 sm:mb-0 h-full`}>
					<ProjectCard project={project} index={index} />
				</div>
			))}
		</div>
	);
};

export default Projects;
