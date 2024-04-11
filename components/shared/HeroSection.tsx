"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "./Bounded";
import { motion } from "framer-motion";
import { socialMediaLinks } from "@/lib/links";
import { SocialIcon } from "react-social-icons";
import Shapes from "../shapes/HeroShapes";
import Spline from "@splinetool/react-spline";

type Props = {};

const HeroSection = (props: Props) => {
	const component = useRef(null);
	useEffect(() => {
		let ctx = gsap.context(() => {
			const tl = gsap.timeline();
			tl.fromTo(
				".name-animation",
				{
					x: 0,
					y: 20,
					opacity: 0,
					scale: -4,
				},
				{
					opacity: 1,
					x: 0,
					y: 0,
					duration: 0.1,
					scale: 1,
					ease: "elastic.out(1,0.3)",
					stagger: {
						each: 0.1,
						from: "random",
						yoyo: true,
					},
				}
			);
			tl.fromTo(
				".job-title",
				{
					y: 20,
					opacity: 0,
					scale: 1.2,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					scale: 1,
					ease: "elastic.out(1,0.3)",
				}
			);
		}, component);
		return () => ctx.revert();
	}, []);

	const firstName: string = "Syed";
	const lastName: string = "Adeeb";
	const tagLine: string = "FULL-STACK DEVELOPER.";

	const renderLetters = (name: string, key: string) => {
		if (!name) return;
		return name.split("").map((letter, index) => (
			<span
				ref={component}
				key={index}
				className={`name-animation border border-transparent text-stroke-light dark:text-stroke-dark hover:text-transparent name-animation-${key}-index inline-block opacity-0 transition-all duration-200 hover:text-bounce ${
					key === "last" &&
					"text-shadow-light-sm dark:text-shadow-dark-sm  lg:text-shadow-light lg:dark:text-shadow-dark text-shadow-none dark:text-shadow-none"
				}`}>
				{letter}
			</span>
		));
	};

	return (
		<Bounded className="max-w-[85%] w-full mx-auto" ref={component}>
			<div className="grid min-h-[70vh] grid-cols-1 lg:grid-cols-2">
				{/* <div className="hidden lg:block transition-all duration-200 hue-rotate-[10deg] shadow-white">
					<Shapes />
				</div> */}
				<motion.div
					className="relative"
					initial={{ x: 10, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}>
					<div className="absolute lg:-top-[2%] lg:left-[0%] -top-20 -left-20 blur-md  md:blur-0 md:hidden lg:inline">
						<Spline scene="https://prod.spline.design/VYFt-kiHGMBlIHOm/scene.splinecode" />
					</div>
				</motion.div>
				<div className="col-start-1 md:row-start-1 ">
					<h1 className="md:mt-20 mb-8 text-hero font-extrabold leading-[70px] md:leading-none text-left">
						<span className="block text-gray-700 dark:text-[#c9c9c9] ">
							{renderLetters(firstName, "first")}
						</span>
						<span className="md:-mt-[.2em] block text-teal-400/90">
							{renderLetters(lastName, "last")}
						</span>
					</h1>
					<span className="block job-title bg-gradient-to-tr from-gray-500 via-slate-800 to-gray-500 dark:from-gray-400 dark:via-slate-200 dark:to-slate-400 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent text-left opacity-1 md:text-4xl">
						{tagLine}
					</span>
					<ul className="flex space-x-4 items-center w-full mt-3 justify-start">
						{socialMediaLinks.map((link, index) => (
							<motion.li
								key={index}
								initial={{ x: -100, opacity: 0 }}
								aria-label={link.name}
								animate={{
									x: 0,
									opacity: 1,
								}}
								transition={{
									duration: 0.5,
									delay: index * 0.1, // Staggering delay for each link
									type: "spring",
									delayChildren: 2,
									stiffness: 150,
									damping: 10,
								}}>
								<h3 className="hover:scale-110 transition-all duration-300 ease-in-out">
									<SocialIcon
										url={link.link}
										className=""
										bgColor="#303030"
										target="_"
									/>
								</h3>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</Bounded>
	);
};

export default HeroSection;
