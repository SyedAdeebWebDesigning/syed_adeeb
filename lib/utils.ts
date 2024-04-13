import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function findEmailInToken(token: string) {
	try {
		// Split the token by the underscore character
		const parts = token.split("_");

		// Extract the second part which may contain the email address
		const emailPart = parts[1];

		// Split the email part by the colon character
		const emailParts = emailPart.split(":");

		// The email address should be the second part after splitting by colon
		const email = emailParts[1];

		// Return the extracted email address
		return email;
	} catch (error) {
		console.error("Error extracting email from token:", error);
		return null;
	}
}
