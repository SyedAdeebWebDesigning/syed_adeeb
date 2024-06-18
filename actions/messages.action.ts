"use server";

import prismadb from "@/lib/prisma";

export const getMessages = async () => {
	try {
		const messages = (await prismadb.messages.findMany()).sort((a, b) => {
			// Convert createdAt timestamps to Date objects
			const createdAtA: any = new Date(a.createdAt);
			const createdAtB: any = new Date(b.createdAt);

			// Sort in descending order
			return createdAtB - createdAtA;
		});
		return messages;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const createMessage = async (data: {
	name: string;
	email: string;
	suggestion: string;
}) => {
	try {
		const message = await prismadb.messages.create({
			data: data, // Corrected this line
		});
		return message;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const deleteMessage = async (id: string) => {
	try {
		const message = await prismadb.messages.delete({ where: { id: id } });
		return message;
	} catch (error: any) {
		console.log(error.message);
	}
};

export const updateMessage = async (
	id: string,
	data: {
		name: string;
		email: string;
		suggestion: string;
	}
) => {
	try {
		const message = await prismadb.messages.update({
			where: { id: id },
			data,
		});
		return message;
	} catch (error: any) {
		console.log(error.message);
	}
};
