"use server";

import prismadb from "@/lib/prisma";
import { Skills } from "@prisma/client";

interface SkillProps {
	title: string;
	imgUrl: string;
	percentage: string;
}

/**
 * Retrieves a list of skills.
 * @returns {Promise<Array<Skill>>} A promise that resolves to an array of skills.
 */
export const getSkills = async (): Promise<Array<Skills>> => {
	const skills = await prismadb.skills.findMany();
	return skills;
};

/**
 * Retrieves a skill by its ID.
 * @param id The ID of the skill to retrieve.
 * @returns A promise that resolves to the skill object.
 */
export const getSkill = async (id: string) => {
	const skill = await prismadb.skills.findUnique({
		where: { id },
	});
	return skill;
};

/**
 * Creates a skill.
 * @param data The skill data.
 * @returns The created skill.
 */
export const createSkill = async (data: SkillProps) => {
	const skill = await prismadb.skills.create({ data });
	return skill;
};

/**
 * Updates a skill with the specified ID.
 * @param id - The ID of the skill to update.
 * @param data - The updated skill data.
 * @returns The updated skill.
 */
export const updateSkill = async (id: string, data: SkillProps) => {
	const skill = await prismadb.skills.update({
		where: { id },
		data,
	});
	return skill;
};

/**
 * Deletes a skill from the database.
 * @param id - The ID of the skill to delete.
 * @returns A Promise that resolves to the deleted skill.
 */
export const deleteSkill = async (id: string) => {
	const skill = await prismadb.skills.delete({
		where: { id },
	});
	return skill;
};
