"use client";
import { getAboutPageData } from "@/actions/aboutpage.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { AboutPageForm } from "@/components/admin/forms/AboutPageForm";
import { AboutPageData } from "@prisma/client";
import React, { useEffect, useState } from "react";

const AboutPageData = () => {
	const [aboutPageData, setAboutPageData] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAboutPageData();
				setAboutPageData(result);
			} catch (error) {
				console.error("Error fetching home page data:", error);
			}
		};

		fetchData();
	}, []);
	
	return (
		<main>
			<AdminHeading>About Page Data</AdminHeading>
			<AboutPageForm aboutPageData={aboutPageData} />
		</main>
	);
};

export default AboutPageData;
