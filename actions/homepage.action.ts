"use server";

import { prismadb } from "@/lib/prisma";

// Fetch the existing home page data
export const getHomePageData = async () => {
	const homePageData = await prismadb.homePageData.findFirst();
	return homePageData;
};

// Create new home page data
export const createHomePageData = async (data: {
	firstName: string;
	lastName: string;
	tagline: string;
}) => {
	const homePageData = await prismadb.homePageData.create({ data });
	return homePageData;
};

// Update existing home page data
export const updateHomePageData = async (
	id: string,
	data: {
		firstName: string;
		lastName: string;
		tagline: string;
	}
) => {
	const homePageData = await prismadb.homePageData.update({
		where: { id: id },
		data,
	});
	return homePageData;
};
