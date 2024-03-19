import Bounded from "@/components/shared/Bounded";
import TimeLine from "@/components/shared/TimeLine";
import Heading from "@/components/shared/heading";
import React from "react";

type Props = {};

const TimelinePage = (props: Props) => {
	return (
		<main>
			<Bounded>
				<Heading>Timeline</Heading>
				<TimeLine />
			</Bounded>
		</main>
	);
};

export default TimelinePage;
