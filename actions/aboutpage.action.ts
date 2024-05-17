"use server";

import { prismadb } from "@/lib/prisma";

/**
 * Fetches the existing about page data.
 * @returns {Promise<object | null>} The about page data.
 */
export const getAboutPageData = async (): Promise<object | null> => {
	const aboutPageData = await prismadb.aboutPageData.findFirst();
	return aboutPageData;
};

/**
 * Creates new about page data.
 * @param {object} data - The data for the about page.
 * @param {string} data.name - The name for the about page.
 * @param {string} data.imgUrl - The image URL for the about page.
 * @param {string} data.message - The description for the about page.
 * @returns {Promise<object>} The created about page data.
 */
export const createAboutPageData = async (data: {
	name: string;
	imgUrl: string;
	message: string;
}): Promise<object> => {
	const aboutPageData = await prismadb.aboutPageData.create({ data });
	return aboutPageData;
};

/**
 * Updates existing about page data.
 * @param {string} id - The ID of the about page data to update.
 * @param {object} data - The updated data for the about page.
 * @param {string} data.name - The updated name for the about page.
 * @param {string} data.imgUrl - The updated image URL for the about page.
 * @param {string} data.message - The updated description for the about page.
 * @returns {Promise<object>} The updated about page data.
 */
export const updateAboutPageData = async (
	id: string,
	data: {
		name: string;
		imgUrl: string;
		message: string;
	}
): Promise<object> => {
	const aboutPageData = await prismadb.aboutPageData.update({
		where: { id: id },
		data,
	});
	return aboutPageData;
};

/**
 * Deletes existing about page data.
 * @param {string} id - The ID of the about page data to delete.
 * @returns {Promise<object>} The deleted about page data.
 */
export const deleteAboutPageData = async (id: string): Promise<object> => {
	const aboutPageData = await prismadb.aboutPageData.delete({
		where: { id: id },
	});
	return aboutPageData;
};
