"use server";
import prismadb from "@/lib/prisma";
import { Timeline } from "@prisma/client";

interface TimelineData {
	date: string;
	title: string;
	description: string;
}

/**
 * Gets the timeline data from the database.
 * @returns {Promise<Timeline>} - A promise that resolves with the timeline data.
 */
export const getTimelineData = async (): Promise<Timeline[] | undefined> => {
	try {
		const timelineData = (await prismadb.timeline.findMany()).sort((a, b) => {
			// Convert createdAt timestamps to Date objects
			const createdAtA: any = new Date(a.createdAt);
			const createdAtB: any = new Date(b.createdAt);

			// Sort in descending order
			return createdAtB - createdAtA;
		});

		if (!timelineData) {
			return [];
		}

		return timelineData;
	} catch (error: any) {
		console.error("Error fetching timeline data:", error.message);
	}
};

/**
 * Gets a timeline item from the database.
 * @param {string} id - The ID of the timeline item to be fetched.
 * @returns {Promise<Timeline>} - A promise that resolves with the timeline item.
 */
export const getTimelineItem = async (id: string): Promise<Timeline | any> => {
	try {
		const timelineItem = await prismadb.timeline.findUnique({
			where: {
				id,
			},
		});

		return timelineItem;
	} catch (error: any) {
		console.error("Error fetching timeline item:", error.message);
	}
};

/**
 * Adds a timeline item to the database.
 * @param {Timeline} timelineItem - The timeline item to be added.
 * @returns {Promise<void>} - A promise that resolves when the timeline item is successfully added.
 */
export const addTimelineItem = async (
	timelineItem: TimelineData
): Promise<void> => {
	try {
		await prismadb.timeline.create({
			data: timelineItem,
		});
	} catch (error: any) {
		console.error("Error adding timeline item:", error.message);
		throw new Error(error.message);
	}
};

/**
 * Deletes a timeline item from the database.
 * @param {string} id - The ID of the timeline item to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the timeline item is successfully deleted.
 */
export const deleteTimelineItem = async (id: string): Promise<void> => {
	try {
		await prismadb.timeline.delete({
			where: {
				id,
			},
		});
	} catch (error: any) {
		console.error("Error deleting timeline item:", error.message);
		throw new Error(error.message);
	}
};

/**
 * Updates a timeline item in the database.
 * @param {string} id - The ID of the timeline item to be updated.
 * @param {Timeline} timelineItem - The updated timeline item.
 * @returns {Promise<void>} - A promise that resolves when the timeline item is successfully updated.
 */
export const updateTimelineItem = async (
	id: string,
	timelineItem: TimelineData
): Promise<void> => {
	try {
		await prismadb.timeline.update({
			where: {
				id,
			},
			data: timelineItem,
		});
	} catch (error: any) {
		console.error("Error updating timeline item:", error.message);
		throw new Error(error.message);
	}
};
