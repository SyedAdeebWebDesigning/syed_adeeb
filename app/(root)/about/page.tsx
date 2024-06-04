"use client";
import { getAboutPageData } from "@/actions/aboutpage.action";
import AboutHeading from "@/components/shared/AboutHeading";
import AboutImage from "@/components/shared/AboutImage";
import Bounded from "@/components/shared/Bounded";
import Heading from "@/components/shared/heading";
import { AboutPageData } from "@prisma/client";
import { useEffect, useState } from "react";

const AboutPage = () => {
	const [aboutPageData, setAboutPageData] = useState<AboutPageData>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result: any = await getAboutPageData();
				setAboutPageData(result);
			} catch (error) {
				console.error("Error fetching home page data:", error);
			}
		};

		fetchData();
	}, []);

	const firstName = aboutPageData?.name
		? aboutPageData.name.slice(0, aboutPageData.name.indexOf(" "))
		: "Syed";
	const lastName = aboutPageData?.name
		? aboutPageData.name.slice(aboutPageData.name.indexOf(" "))
		: "Adeeb";
	const message = aboutPageData?.message || "Default message";
	const imgUrl = aboutPageData?.imgUrl || "/default-image.png";

	return (
		<main>
			<Bounded>
				<Heading>About</Heading>
				<section className="grid grid-cols-1 grid-rows-none lg:grid-cols-2 mt-10">
					<div className="mx-auto mt-10 order-1 lg:order-none">
						<AboutHeading
							firstName={firstName}
							lastName={lastName}
							message={message}
						/>
					</div>
					<div className="mx-auto">
						<AboutImage imgUrl={imgUrl} />
					</div>
				</section>
			</Bounded>
		</main>
	);
};

export default AboutPage;
