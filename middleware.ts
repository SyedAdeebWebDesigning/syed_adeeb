import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
	publicRoutes: ["/api/webhooks(.*)"],
	matcher: ["/admin"], // Only match routes under /admin/*
};
