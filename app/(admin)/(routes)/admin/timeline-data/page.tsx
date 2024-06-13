"use client";

import { getTimelineData } from "@/actions/timeline.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import TimelineDataList from "@/components/admin/list/timelineDataList";
import { Button } from "@/components/ui/button";
import { Timeline } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TimeLineData = () => {
	const [timelineData, setTimelineData] = useState<Timeline[]>([]);

	const fetchData = async () => {
		const data: Timeline[] | undefined = await getTimelineData();
		if (data) {
			setTimelineData(data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<AdminHeading>Timeline Data</AdminHeading>
			<section className="">
				{timelineData && timelineData.length > 0 ? (
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
