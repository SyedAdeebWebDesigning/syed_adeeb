"use client";
import { getTimelineData } from "@/actions/timeline.action";
import Bounded from "@/components/shared/Bounded";
import { HorizontalTimeLine } from "@/components/shared/HorizontalTimeLine";
import TimeLine from "@/components/shared/TimeLine";
import Heading from "@/components/shared/heading";
import { Timeline } from "@prisma/client";
import React, { useEffect, useState } from "react";

type Props = {};

const TimelinePage = (props: Props) => {
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
			<Bounded>
				<Heading>Timeline</Heading>
				<section className="hidden sm:inline">
					<TimeLine timelineData={timelineData} />
				</section>
				<section className="sm:hidden grid place-items-center h-[50dvh] relative">
					<HorizontalTimeLine timelineData={timelineData} />
				</section>
			</Bounded>
		</main>
	);
};

export default TimelinePage;
