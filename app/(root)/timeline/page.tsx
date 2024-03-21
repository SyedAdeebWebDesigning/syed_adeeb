import Bounded from "@/components/shared/Bounded";
import { HorizontalTimeLine } from "@/components/shared/HorizontalTimeLine";
import TimeLine from "@/components/shared/TimeLine";
import Heading from "@/components/shared/heading";
import React from "react";

type Props = {};

const TimelinePage = (props: Props) => {
	return (
		<main>
			<Bounded>
				<Heading>Timeline</Heading>
				<section className="hidden sm:inline">
					<TimeLine />
				</section>
				<section className="sm:hidden grid place-items-center h-[50dvh] relative">
					<HorizontalTimeLine />
				</section>
			</Bounded>
		</main>
	);
};

export default TimelinePage;
