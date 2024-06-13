import React from "react";

type Props = {
	title: string;
	desc: string;
	date: string;
	index: number;
};

const TimelineDataList = ({ title, desc, date, index }: Props) => {
	return (
		<div className="bg-slate-400/30 my-2 sm:w-1/2 mx-auto px-4 py-2 rounded-full">
			<div className="flex justify-between">
				<h1 className="line-clamp-1">
					{index + 1}. {title}
				</h1>
				<h1 className="text-sm dark:text-gray-300 text-gray-600 line-clamp-1">
					{date}
				</h1>
			</div>
			<p className="text-sm line-clamp-1 text-gray-700 dark:text-gray-300">
				{desc}
			</p>
		</div>
	);
};

export default TimelineDataList;
