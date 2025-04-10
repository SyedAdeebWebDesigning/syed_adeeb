"use client";
import { getAboutPageData } from "@/actions/aboutpage.action";
import Loading from "@/components/loading";
import AboutHeading from "@/components/shared/AboutHeading";
import AboutImage from "@/components/shared/AboutImage";
import Bounded from "@/components/shared/Bounded";
import Heading from "@/components/shared/heading";
import { AboutPageData } from "@prisma/client";
import { useEffect, useState } from "react";

const AboutPage = () => {
	const [aboutPageData, setAboutPageData] = useState<AboutPageData | null>(
		null
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result: AboutPageData | any = await getAboutPageData();
				setAboutPageData(result);
			} catch (error) {
				console.error("Error fetching about page data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <Loading />;
	}

	const firstName = aboutPageData?.name
		? aboutPageData.name.slice(0, aboutPageData.name.indexOf(" "))
		: "Mohammad Shoaib";
	const lastName = aboutPageData?.name
		? aboutPageData.name.slice(aboutPageData.name.indexOf(" ") + 1)
		: "Adeeb";
	const message =
		aboutPageData?.message ||
		"I am Mohammad Shoaib Khan, a full-stack developer specializing in web development since 2022. I build user-centric websites with expertise in front-end and back-end technologies, staying updated to deliver innovative solutions that exceed expectations.";
	const imgUrl = aboutPageData?.imgUrl || "/about1.png";

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
