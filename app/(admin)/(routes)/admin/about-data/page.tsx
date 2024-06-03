import { getAboutPageData } from "@/actions/aboutpage.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { AboutPageForm } from "@/components/admin/forms/AboutPageForm";

import React from "react";

const AboutPageData = async () => {
	return (
		<main>
			<AdminHeading>About Page Data</AdminHeading>
			<AboutPageForm />
		</main>
	);
};

export default AboutPageData;
