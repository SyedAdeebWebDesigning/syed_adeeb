"use client";

import { getTimelineData } from "@/actions/timeline.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import TimelineDataList from "@/components/admin/list/timelineDataList";
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
			<section>
				{timelineData && timelineData.length > 0 ? (
					<div>
						{timelineData.map((timeline, index) => (
							<Link
								href={`/admin/timeline-data/${timeline.id}`}
								key={timeline.id}>
								<TimelineDataList
									title={timeline.title}
									desc={timeline.description}
									date={timeline.date}
									index={index}
								/>
							</Link>
						))}
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
