"use client";

import { getTimelineData } from "@/actions/timeline.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import TimelineDataList from "@/components/admin/list/timelineDataList";
import { Button } from "@/components/ui/button";
import { Timeline } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Skeleton Loader Component
const SkeletonLoader = () => (
	<div className="bg-slate-400/30 my-2 sm:w-1/2 mx-auto px-4 py-2 rounded-full flex items-center relative animate-pulse">
		<div className="pr-6 cursor-pointer">
			<div className="flex justify-start items-center">
				<div className="bg-gray-200 h-2 w-3/4 rounded-full mb-1"></div>
			</div>
			<div className="bg-gray-200 h-2 w-2/4 rounded-full mb-1"></div>
			<div className="bg-gray-200 h-2 w-3/4 rounded-full mb-1"></div>
			<div className="bg-gray-200 h-2 w-2/4 rounded-full"></div>
		</div>
		<div className="ml-auto absolute right-2 bg-gray-200/50 dark:bg-gray-700/70 rounded-full size-10 items-center justify-center flex"></div>
	</div>
);

const TimeLineData = () => {
	const [timelineData, setTimelineData] = useState<Timeline[]>([]);
	const [loading, setLoading] = useState(true); // State to manage loading state

	const fetchData = async () => {
		try {
			const data: Timeline[] | undefined = await getTimelineData();
			if (data) {
				setTimelineData(data);
			}
		} catch (error) {
			console.error("Error fetching timeline data:", error);
		} finally {
			setLoading(false); // After fetching data, set loading to false
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<AdminHeading>Timeline Data</AdminHeading>
			<section className="">
				{loading ? (
					<div className="mt-5 px-2">
						{Array.from({ length: 4 }).map((_, index) => (
							<div key={index}>
								<SkeletonLoader />
							</div>
						))}
					</div>
				) : timelineData && timelineData.length > 0 ? (
					<div className="relative">
						<div className="max-h-[25vh] overflow-y-auto p-4 pr-0 relative">
							{timelineData.map((timeline, index) => (
								<div key={timeline.id}>
									<TimelineDataList
										title={timeline.title}
										desc={timeline.description}
										date={timeline.date}
										index={index}
										id={timeline.id}
									/>
								</div>
							))}
						</div>
						<Link
							href={"/admin/timeline-data/new"}
							className="flex items-center justify-center px-2 w-full sm:w-1/2 mx-auto mt-2">
							<Button className="w-full rounded-full">Add new data</Button>
						</Link>
					</div>
				) : (
					<HandleNoData
						title="No timeline data"
						buttonText="Add new timeline data"
						link="/admin/timeline-data/new"
					/>
				)}
			</section>
		</main>
	);
};

export default TimeLineData;
