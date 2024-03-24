import Bounded from "@/components/shared/Bounded";
import Skills from "@/components/shared/Skills";
import Heading from "@/components/shared/heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<Bounded>
			<Heading>Skills</Heading>
			<section>
				<Skills />
			</section>
		</Bounded>
	);
};

export default page;
