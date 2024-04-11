"use server";

import { prismadb } from "@/lib/prisma";
import { User } from "@prisma/client";

/**
 * Adds a user to the database.
 * @param {User} user - The user object containing the user details.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully added.
 */
export const addUser = async (user: User): Promise<void> => {
	try {
		await prismadb.user.create({
			data: user,
		});
	} catch (error) {
		console.log("Error creating user");
	}
};

export const deleteUser = async (clerkId: string | any) => {
	try {
		await prismadb.user.delete({
			where: {
				clerkId,
			},
		});
	} catch (error) {
		console.log("Error deleting user");
	}
};

export const updateUser = async (
	clerkId: string,
	user: {
		firstName: string;
		lastName: string;
		imgUrl: string;
		email: string;
	}
): Promise<void> => {
	try {
		await prismadb.user.update({
			where: {
				clerkId,
			},
			data: user,
		});
	} catch (error) {
		console.log("Error updating user");
	}
};
