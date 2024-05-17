import { getAboutPageData } from "@/actions/aboutpage.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { AboutPageForm } from "@/components/admin/forms/AboutPageForm";
import { AboutPageData } from "@prisma/client";
import React from "react";

const AboutPageData = async () => {
	const aboutPageData: AboutPageData | null | any = await getAboutPageData();
	return (
		<main>
			<AdminHeading>About Page Data</AdminHeading>
			<AboutPageForm aboutPageData={aboutPageData} />
		</main>
	);
};

export default AboutPageData;
