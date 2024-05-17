"use server";

import { toast } from "@/components/ui/use-toast";
import prismadb from "@/lib/prisma";
import { User } from "@prisma/client";
import crypto from "crypto";

/**
 * Adds a user to the database.
 * @param {User} user - The user object containing the user details.
 * @returns {Promise<void>} - A promise that resolves when the user is successfully added.
 */
export const addUser = async ({
	email,
	firstName,
	imgUrl,
	isAdmin,
	lastName,
	password,
}: {
	email: string;
	firstName: string;
	imgUrl: string;
	isAdmin: boolean;
	lastName: string;
	password: string;
}): Promise<void> => {
	const encryptedPassword = crypto
		.createHash("sha256")
		.update(password)
		.digest("base64");

	try {
		await prismadb.user.create({
			data: {
				email,
				firstName,
				imgUrl,
				isAdmin,
				password: encryptedPassword,
				lastName,
			},
		});
	} catch (error: any) {
		console.log("Error creating user", error.message);
		throw new Error(error.message);
	}
};

export const deleteUser = async (id: string | any) => {
	try {
		await prismadb.user.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log("Error deleting user");
	}
};

export const updateUser = async ({
	id,
	firstName,
	lastName,
	imgUrl,
	email,
	isAdmin,
}: User): Promise<void> => {
	try {
		await prismadb.user.update({
			where: {
				id,
			},
			data: {
				firstName,
				lastName,
				imgUrl,
				email,
				isAdmin,
			},
		});
	} catch (error) {
		console.log("Error updating user");
	}
};

export const getUsers = async (): Promise<User[]> => {
	try {
		const users = await prismadb.user.findMany();
		return users;
	} catch (error) {
		console.log("Error retrieving users");
		return [];
	}
};

export const getUserById = async (
	id: string
): Promise<User | null | undefined> => {
	try {
		const user = await prismadb.user.findUnique({
			where: {
				id,
			},
		});
		return user;
	} catch (error) {
		console.log("Error retrieving user");
	}
	return null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	try {
		const user = await prismadb.user.findUnique({
			where: {
				email: email,
			},
		});
		return user;
	} catch (error) {
		console.log("Error retrieving user by email");
		return null;
	}
};

export const signIn = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	try {
		const encryptedPassword = crypto
			.createHash("sha256")
			.update(password)
			.digest("base64");
		const user = await prismadb.user.findFirst({
			where: {
				email: email,
			},
		});

		if (!user) {
			throw new Error("User not found");
		}

		if (user?.password === encryptedPassword) {
			return user;
		} else {
			throw new Error("Invalid email or password");
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
};
