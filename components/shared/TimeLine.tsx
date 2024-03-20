"use client";
import React from "react";
import { timelineData } from "@/lib/links";
import { motion } from "framer-motion";

type Props = {};

const TimeLine = (props: Props) => {
	return (
		<section>
			<div className="container mx-auto w-full h-full">
				<div className="relative wrap overflow-hidden p-10 h-full">
					<motion.div
						className="border-2-2 absolute border-opacity-90  border-emerald-500 dark:border-emerald-300 border left-[50%]"
						initial={{ height: 0, opacity: 0 }}
						animate={{
							height: "100%",
							opacity: 1,
							transition: { type: "spring", stiffness: 10, damping: 10 },
						}}
						transition={{ duration: 1 }}
					/>
					{timelineData.map((timeline, index) => {
						return (
							<div
								className={`mb-8 flex justify-between items-center ${
									index % 2 === 0 && "flex-row-reverse"
								}  w-full right-timeline`}
								key={timeline.title}>
								<div className="order-1 w-5/12" />
								<motion.div
									initial={{ opacity: 0, scale: 2 }}
									animate={{
										opacity: 1,
										scale: 1,
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
								<div
									className={`order-1 bg-gradient-to-tr  ${
										index % 2 === 0
											? "from-gray-100 to-gray-200 dark:from-gray-700 dark:to-slate-700"
											: "from-teal-100 to-emerald-200 dark:from-teal-700 dark:to-emerald-700"
									} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
									<h3 className="my-2 font-bold text-gray-600 text-md dark:text-gray-300">
										{timeline.date}
									</h3>
									<h3 className="mb-3 font-bold text-gray-800 text-xl dark:text-gray-200">
										{timeline.title}
									</h3>
									<p className="text-sm leading-snug tracking-wide  text-opacity-100 text-gray-900 dark:text-gray-300">
										{timeline.content}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default TimeLine;
