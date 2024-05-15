"use server";

import { prismadb } from "@/lib/prisma";

export const getSocialIcons = async () => {
	const socialIcons = await prismadb.socialIcons.findMany();
	return socialIcons;
};

export const createSocialIcon = async (data: { url: string }) => {
	const socialIcon = await prismadb.socialIcons.create({ data });
	if (!socialIcon) {
		throw new Error("Social Icon not created");
	}
	return socialIcon;
};

export const deleteSocialIcon = async (id: string) => {
	const socialIcon = await prismadb.socialIcons.delete({ where: { id } });
	return socialIcon;
};
