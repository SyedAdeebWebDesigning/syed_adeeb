"use client";
import React from "react";
import { timelineData } from "@/lib/links";
import { motion } from "framer-motion";

type Props = {};

const TimeLine = (props: Props) => {
	return (
		<div>
			<div className="container mx-auto w-full h-full">
				<div className="relative wrap overflow-hidden p-10 h-full">
					<motion.div
						className="border-2-2 absolute border-opacity-90  border-emerald-500 dark:border-emerald-300 border left-[50%]"
						initial={{ height: 0, opacity: 0 }}
						animate={{
							height: "90%",
							opacity: 1,
							transition: { type: "spring", stiffness: 10, damping: 10 },
						}}
					/>
					{timelineData.map((timeline, index) => {
						const isLeft = index % 2 === 0;
						const value = isLeft ? 10 : -10;
						return (
							<motion.div
								initial={{ x: value, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{
									delay: index * 0.5,
									duration: 0.1,
									type: "spring",
									stiffness: 70,
									damping: 6,
								}}
								className={`mb-8 flex justify-between items-center ${
									index % 2 === 0 && "flex-row-reverse"
								}  w-full right-timeline`}
								key={timeline.title}>
								<div className="order-1 w-5/12" />
								<motion.div
									initial={{ opacity: 0, scale: 1, x: 0 }}
									animate={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									transition={{
										delay: index * 0.1, // Staggering delay for each link
										type: "spring",
										stiffness: 3,
										damping: 1,
									}}
									className="z-20 flex items-center order-1 bg-teal-500 dark:bg-teal-800 shadow-xl w-8 h-8 rounded-full">
									<h1 className="mx-auto font-semibold text-lg text-black dark:text-white">
										{index + 1}
									</h1>
								</motion.div>
								<motion.div
									className={`order-1 bg-gradient-to-tr  ${
										index % 2 === 0
											? "from-slate-300 to-gray-300 transition-all duration-200 ease-in-out dark:from-gray-700 dark:to-slate-700"
											: "from-teal-300 to-emerald-300 dark:from-teal-700 dark:to-emerald-700"
									} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
									<h3 className="my-2 font-bold text-gray-600 text-md dark:text-gray-300">
										{timeline.date}
									</h3>
									<h3 className="mb-3 font-bold text-gray-800 text-xl dark:text-gray-200">
										{timeline.title}
									</h3>
									<p className="text-sm leading-snug tracking-wide line-clamp-2  text-opacity-100 text-gray-900 dark:text-gray-300">
										{timeline.content}
									</p>
								</motion.div>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default TimeLine;
