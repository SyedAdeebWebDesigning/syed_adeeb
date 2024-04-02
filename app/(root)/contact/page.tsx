import Contact from "@/components/forms/Contact";
import Bounded from "@/components/shared/Bounded";
import Heading from "@/components/shared/heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<main>
			<Bounded>
				<Heading>Contact</Heading>
				<section className="text-gray-600 body-font relative">
					<Contact />
				</section>
			</Bounded>
		</main>
	);
};

export default page;
