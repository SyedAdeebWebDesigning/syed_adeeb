"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "../shared/input";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { createMessage } from "@/actions/messages.action";
import { toast } from "../ui/use-toast";

type Props = {};

const Contact = (props: Props) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [messageStatus, setMessageStatus] = useState<
		"initial" | "sending" | "sended"
	>("initial");
	const maxLength = 500;
	const minLength = 5;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setMessageStatus("sending");
		try {
			const data = { name: name, email: email, suggestion: message };
			await createMessage(data);
			toast({ description: "Message sent successfully", variant: "default" });
			setMessageStatus("sended");
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
			console.log(error.message);
		} finally {
			setEmail("");
			setName("");
			setMessage("");
			setMessageStatus("initial");
		}
	};
	return (
		<div className="container px-5 py-24 mx-auto">
			<div className="lg:w-1/2 md:w-2/3 mx-auto">
				<form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
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
								id="name"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
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
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
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
							<Textarea
								className="bg-gray-300 dark:bg-[#3b3b3b] border-none dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white relative"
								placeholder="Give us your suggestions"
								minLength={minLength}
								maxLength={maxLength}
								value={message}
								rows={6}
								required
								onChange={(e) => setMessage(e.target.value)}
							/>
							<h2 className="absolute bottom-2 right-2 dark:text-gray-300 text-gray-800">
								{maxLength - message.length}
							</h2>
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
							disabled={
								!email ||
								!name ||
								!message ||
								message.length < minLength ||
								message.length > maxLength ||
								messageStatus === "sending"
							}>
							{messageStatus === "sending" ? "Sending..." : "Send Message"}
						</Button>
					</motion.div>
				</form>
			</div>
		</div>
	);
};

export default Contact;
