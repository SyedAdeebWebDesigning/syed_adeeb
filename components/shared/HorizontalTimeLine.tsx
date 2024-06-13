"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { timelineData } from "@/lib/links";
import { motion } from "framer-motion";
import { Timeline } from "@prisma/client";

interface Props {
	timelineData: Timeline | any;
}

export function HorizontalTimeLine({ timelineData }: Props) {
	const delay = 4000;
	const plugin = React.useRef(
		Autoplay({ delay: delay, stopOnInteraction: false })
	);

	return (
		<Carousel
			className="w-full max-w-xs my-3 grid place-content-center h-full "
			plugins={[plugin.current]}>
			<CarouselContent>
				{timelineData.map((timeline: Timeline, parentIndex: number) => {
					return (
						<CarouselItem key={parentIndex} className="space-y-10 ">
							<div className="p-1 space-y-4">
								<h2 className="text-gray-600 dark:text-gray-300">
									{timeline.date}
								</h2>
								<motion.h1
									initial={{ x: 100, opacity: 0 }}
									whileInView={{ x: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}
									className={`text-3xl ${
										parentIndex % 2 === 0 && "text-teal-500"
									} font-semibold`}>
									{timeline.title}
								</motion.h1>
								<motion.p
									initial={{ y: 30, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.5 }}
									className="line-clamp-2">
									{timeline.description}
								</motion.p>
							</div>
							<div className="flex justify-center items-center bottom-20 w-full">
								{timelineData.map((_: Timeline, index: number) => (
									<div
										key={index}
										className={`flex items-center justify-center cursor-pointer ${
											parentIndex === index ? "text-white" : "text-gray-400"
										}`}>
										<div
											className={`h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-400 ${
												parentIndex === index
													? "bg-teal-500 border-teal-500"
													: ""
											}`}>
											{index + 1}
										</div>
										{index !== timelineData.length - 1 && (
											<div
												className={`h-1 w-6 bg-gray-400 ${
													parentIndex === index ? "bg-teal-500" : ""
												}`}></div>
										)}
									</div>
								))}
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
		</Carousel>
	);
}
