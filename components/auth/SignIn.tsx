"use client";
import CustomInput from "../shared/input";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import { signIn } from "@/actions/user.action";
import crypto from "crypto";
import { findEmailInToken } from "@/lib/utils";

export const SignIn = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = `${crypto
			.createHash("sha256")
			.update(email)
			.digest("base64")}_email:${email}`;
		try {
			await signIn({ email: email, password: password });
			toast({ description: "User logged in", variant: "default" });
			localStorage.setItem("token", token);
			router.push("/");
		} catch (err: any) {
			toast({ description: err.message, variant: "destructive" });
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			window.location.href = "/";
		}
	}, []);

	return (
		<section className="">
			<div className="px-5 py-24 ">
				<div className="lg:w-4/5 md:w-2/3 mx-auto rounded-md p-10 relative">
					<motion.h3
						className="text-3xl mb-10 text-center"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							stiffness: 50,
							damping: 10,
							type: "spring",
							delay: 0.1,
						}}>
						Sign In
					</motion.h3>
					<form className="flex flex-wrap -m-2 ">
						<div className="p-2 w-full">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0.2,
								}}>
								<CustomInput
									isRequired
									type="email"
									id="email"
									name="email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</motion.div>
						</div>

						<div className="p-2 w-full">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0.6,
								}}>
								<CustomInput
									isRequired
									type="password"
									id="password"
									name="password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
							</motion.div>
						</div>
						<motion.div
							className="p-2 w-full"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								stiffness: 50,
								damping: 10,
								type: "spring",
								delay: 0.8,
							}}>
							<Button onClick={handleSubmit} className="w-full">
								Sign In
							</Button>
							<div className="flex justify-start">
								<p>Don&apos;t have an account?</p>
								<Link
									href={"/sign-up"}
									className="ml-1 text-teal-700 dark:text-teal-400">
									Sign up
								</Link>
							</div>
						</motion.div>
					</form>
				</div>
			</div>
		</section>
	);
};
