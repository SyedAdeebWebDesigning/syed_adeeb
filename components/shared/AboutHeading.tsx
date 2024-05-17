"use client";
import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
type Props = {
	firstName: string;
	lastName: string;
	message: string;
};

const AboutHeading = ({ firstName, lastName, message }: Props) => {
	const words = [
		{
			text: "Hello",
		},
		{
			text: "I",
		},
		{
			text: "am",
		},
		{
			text: firstName,
			className: "text-emerald-700 dark:text-emerald-500",
		},
		{
			text: `${lastName}.`,
			className: "text-emerald-700 dark:text-emerald-500",
		},
	];

	const about = message;
	return (
		<div className="text-center lg:text-left">
			<motion.div
				className="text-3xl flex items-center justify-center flex-col lg:items-start"
				initial={{ x: -100, opacity: 0 }}
				animate={{
					x: 0,
					opacity: 1,
					transition: {
						type: "spring",
						stiffness: 150,
						damping: 7,
						duration: 3.2,
					},
				}}>
				<TypewriterEffectSmooth words={words} />
				<TextGenerateEffect words={about} />
			</motion.div>
		</div>
	);
};

export default AboutHeading;
