import Bounded from "@/components/shared/Bounded";
import Projects from "@/components/shared/Projects";
import Heading from "@/components/shared/heading";
import React from "react";

type Props = {};

const ProjectsPage = (props: Props) => {
	return (
		<main>
			<Bounded>
				<Heading>Projects</Heading>
				<section>
					<Projects />
				</section>
			</Bounded>
		</main>
	);
};

export default ProjectsPage;
