"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "@prisma/client";

import { Loader2 } from "lucide-react";
import Loading from "../loading";

type Props = {
	timelineData: Timeline[];
};

const TimeLine: React.FC<Props> = ({ timelineData }: Props) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (timelineData && timelineData.length > 0) {
			setLoading(false);
		}
	}, [timelineData]);

	if (loading) {
		return <Loading />;
	}
	return (
		<div className="container mx-auto">
			<div className="relative wrap overflow-hidden p-10">
				<motion.div
					className="border-2-2 absolute border-opacity-90 border-emerald-500 dark:border-emerald-300 border left-[50%]"
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "90%", opacity: 1 }}
					transition={{ type: "spring", stiffness: 10, damping: 10 }}
				/>
				{timelineData.map((timeline: Timeline, index: number) => {
					const isLeft = index % 2 === 0;
					const value = isLeft ? 10 : -10;
					return (
						<motion.div
							key={timeline.title}
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
							}`}>
							<div className="order-1 w-5/12" />
							<motion.div
								initial={{ opacity: 0, scale: 1, x: 0 }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{
									delay: index * 0.1,
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
								className={`order-1 bg-gradient-to-tr ${
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
								<p className="text-sm leading-snug tracking-wide line-clamp-2 text-opacity-100 text-gray-900 dark:text-gray-300">
									{timeline.description}
								</p>
							</motion.div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};

export default TimeLine;
