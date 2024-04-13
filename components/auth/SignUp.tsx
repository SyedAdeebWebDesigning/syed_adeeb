"use client";
import CustomInput from "../shared/input";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { addUser, getUserByEmail } from "@/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import crypto from "crypto";

export const SignUp = () => {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [imageUrl, setImageUrl] = useState(null);

	// Function to handle file input change
	const handleFileChange = (event: any) => {
		const file = event.target.files[0];

		setSelectedFile(file);
		generateImageUrl(file);
	};

	// Function to generate URL for the selected file
	const generateImageUrl = (file: any) => {
		const reader: any = new FileReader();
		reader.onload = () => {
			setImageUrl(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const token = `${crypto
			.createHash("sha256")
			.update(email)
			.digest("base64")}_email:${email}`;
		const imgUrl = imageUrl !== null ? imageUrl : "";
		const user = await getUserByEmail(email);
		if (!user) {
			try {
				await addUser({
					email,
					firstName,
					lastName,
					password,
					imgUrl: imgUrl,
					isAdmin: false,
				});
				localStorage.setItem("token", token);
				toast({ description: "User created successfully", variant: "default" });
				router.push("/");
			} catch (error: any) {
				toast({
					description: `${error.message}`,
					variant: "destructive",
				});
			}
		} else {
			toast({
				description: "User already Exists. Try using another email address.",
				variant: "destructive",
			});
		}
	};

	const disabled: boolean =
		!firstName ||
		!lastName ||
		!email ||
		!password ||
		!selectedFile ||
		!imageUrl;

	return (
		<section className="">
			<div className="px-5 py-24 ">
				<div className="lg:w-2/4 md:w-2/3 mx-auto rounded-md p-10 relative">
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
						Sign Up
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
									delay: 0,
								}}>
								<Label className="text-gray-700 dark:text-gray-300 text-sm flex justify-between">
									<p>
										Profile Picture Less than 700Kb{" "}
										{selectedFile && selectedFile.size > 700 * 1024 ? (
											<span className="text-red-500">
												Size Exceeded (
												{selectedFile && Math.floor(selectedFile.size / 1024)}
												Kb)
											</span>
										) : (
											<span className="text-green-500">
												Size Normal (
												{selectedFile && Math.floor(selectedFile.size / 1024)}
												Kb)
											</span>
										)}
									</p>
								</Label>
								<Input
									maxLength={700}
									required
									type="file"
									onChange={handleFileChange}
									accept="image/*"
									className="bg-gray-300 dark:bg-[#3b3b3b] border-none dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white"
								/>
							</motion.div>
						</div>
						<div className="p-2 w-1/2">
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
									type="text"
									id="firstName"
									name="firstName"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</motion.div>
						</div>
						<div className="p-2 w-1/2">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0.4,
								}}>
								<CustomInput
									isRequired
									type="text"
									id="lastName"
									name="lastName"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
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
							<Button
								className="w-full"
								onClick={handleSubmit}
								disabled={disabled}>
								Sign Up
							</Button>
							<div className="flex justify-start">
								<p>Already have an account?</p>
								<Link
									href={"/sign-in"}
									className="ml-1 text-teal-700 dark:text-teal-400">
									Sign in
								</Link>
							</div>
						</motion.div>
					</form>
				</div>
			</div>
		</section>
	);
};
