import React from "react";
import { timelineData } from "@/lib/links";

type Props = {};

const TimeLine = (props: Props) => {
	return (
		<section>
			<div className="container mx-auto w-full h-full">
				<div className="relative wrap overflow-hidden p-10 h-full">
					<div className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-500 h-full border left-[50%]" />
					{timelineData.map((timeline, index) => {
						return (
							<div
								className={`mb-8 flex justify-between items-center ${
									index % 2 === 0 && "flex-row-reverse"
								}  w-full right-timeline`}
								key={timeline.title}>
								<div className="order-1 w-5/12"></div>
								<div className="z-20 flex items-center order-1 bg-gray-800 dark:bg-gray-300 shadow-xl w-8 h-8 rounded-full">
									<h1 className="mx-auto font-semibold text-lg text-white dark:text-black">
										{index + 1}
									</h1>
								</div>
								<div className="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
									<h3 className="mb-3 font-bold text-gray-800 text-xl">
										{timeline.title}
									</h3>
									<p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry. Lorem Ipsum has been the{" "}
										{"industry's"} standard dummy text ever since the 1500s,
										when an unknown printer took a galley of type and scrambled
										it to make a type specimen book.
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
