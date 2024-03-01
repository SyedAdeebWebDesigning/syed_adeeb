"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

type Props = {
	children: React.ReactNode;
};

const Heading = ({ children }: Props) => {
	const component = useRef(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			const tl = gsap.timeline();
			tl.fromTo(
				".text-animate",
				{
					scale: 4,
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.4,
					delay: 0.3,
					scale: 1,
					ease: "elastic.out(0,0.2)",
					stagger: {
						each: 0.1,
						from: "start",
						yoyo: true,
					},
				}
			);
		}, component);
		return () => ctx.revert();
	}, []);
	const renderLetters = (name: string, key: string) => {
		if (!name) return;
		return name.split("").map((letter, index) => (
			<span
				key={index}
				className={`text-animate border border-transparent text-stroke-light dark:text-stroke-dark hover:text-transparent name-animation-${key}-index inline-block transition-all duration-200 hover:text-bounce opacity-0 text-shadow-light-sm dark:text-shadow-dark-sm  text-shadow-none dark:text-shadow-none text-teal-400/90`}>
				{letter}
			</span>
		));
	};
	return (
		<h3
			className="text-center lg:text-left font-semibold text-gray-700 dark:text-gray-300 text-4xl tracking-[0.4em] sm:text-6xl sm:tracking-normal"
			ref={component}>
			{renderLetters(
				JSON.parse(JSON.stringify(children).toUpperCase()),
				"heading"
			)}
		</h3>
	);
};

export default Heading;
