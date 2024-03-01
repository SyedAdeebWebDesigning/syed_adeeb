"use client";
import React from "react";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../ui/text-generate-effect";
type Props = {};

const AboutHeading = (props: Props) => {
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
			text: "Syed",
			className: "text-emerald-700 dark:text-emerald-500",
		},
		{
			text: "Adeeb.",
			className: "text-emerald-700 dark:text-emerald-500",
		},
	];

	const about = `
I am Syed Adeeb, a seasoned full-stack developer specializing in web development since 2020. My focus is on crafting sophisticated and user-centric websites by leveraging my expertise in both front-end and back-end technologies. I am committed to staying updated with the latest advancements in the field to deliver innovative solutions that exceed client expectations.`;
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
