import { getHomePageData } from "@/actions/homepage.action";
import { getSocialIcons } from "@/actions/socialIcons.action";
import HeroSection from "@/components/shared/HeroSection";

export default async function Home() {
	const homePageData = await getHomePageData();
	const socialIcons = await getSocialIcons();
	return (
		<main className="">
			<HeroSection socialIcons={socialIcons} homePageData={homePageData} />
		</main>
	);
}
