"use server";

import prismadb from "@/lib/prisma";
import { Projects } from "@prisma/client";

interface ProjectProps {
	title: string;
	description: string;
	link: string;
	imgUrl: string;
	isFeatured: boolean;
}

/**
 * Retrieves a list of projects.
 * @returns {Promise<Project[]>} A promise that resolves to an array of projects.
 */
export const getProjects = async (): Promise<Projects[] | undefined> => {
	try {
		const projects = await prismadb.projects.findMany();
		return projects;
	} catch (error) {
		console.error("Error retrieving projects:", error);
	}
};

/**
 * Retrieves a project by its ID.
 * @param id The ID of the project to retrieve.
 * @returns A promise that resolves to the retrieved project.
 */
export const getProject = async (id: string) => {
	try {
		const project = await prismadb.projects.findUnique({
			where: { id },
		});
		return project;
	} catch (error) {
		console.error(`Error retrieving project with ID ${id}:`, error);
	}
};

/**
 * Creates a new project.
 * @param data The project data.
 * @returns The created project.
 */
export const createProject = async (data: ProjectProps) => {
	try {
		await prismadb.projects.create({ data });
	} catch (error) {
		console.error("Error creating project:", error);
	}
};

/**
 * Updates a project with the specified ID.
 * @param id - The ID of the project to update.
 * @param data - The updated project data.
 * @returns The updated project.
 */
export const updateProject = async (id: string, data: ProjectProps) => {
	try {
		const project = await prismadb.projects.update({
			where: { id },
			data,
		});
		return project;
	} catch (error) {
		console.error(`Error updating project with ID ${id}:`, error);
	}
};

/**
 * Deletes a project by its ID.
 * @param id The ID of the project to delete.
 * @returns A promise that resolves to the deleted project.
 */
export const deleteProject = async (id: string) => {
	try {
		const project = await prismadb.projects.delete({
			where: { id },
		});
		return project;
	} catch (error) {
		console.error(`Error deleting project with ID ${id}:`, error);
	}
};

/**
 * Retrieves a list of featured projects.
 * @returns {Promise<Project[]>} A promise that resolves to an array of featured projects.
 */
export const getFeaturedProjects = async (): Promise<
	Projects[] | undefined
> => {
	try {
		const projects = await prismadb.projects.findMany({
			where: { isFeatured: true },
		});
		return projects;
	} catch (error) {
		console.error("Error retrieving featured projects:", error);
	}
	return undefined;
};

/**
 * Toggles the "isFeatured" property of a project.
 *
 * @param id - The ID of the project to toggle.
 * @returns The updated project object.
 * @throws Error if the project is not found.
 */
export const toggleFeaturedProject = async (id: string) => {
	try {
		// Find the current project state
		const project = await prismadb.projects.findUnique({
			where: { id },
		});

		if (!project) {
			// Handle the case when project is null
		}

		// Toggle the isFeatured property if project is not null
		const updatedProject = await prismadb.projects.update({
			where: { id },
			data: { isFeatured: project ? !project.isFeatured : false },
		});

		return updatedProject;
	} catch (error) {
		console.error(
			`Error toggling featured state for project with ID ${id}:`,
			error
		);
	}
};
