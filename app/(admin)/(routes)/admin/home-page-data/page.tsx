import { getHomePageData } from "@/actions/homepage.action";
import { getSocialIcons } from "@/actions/socialIcons.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HomePage from "@/components/admin/forms/HomePage";

const HomePageData = async () => {
	const socialIcons = await getSocialIcons();
	const homePageData = await getHomePageData();
	return (
		<main>
			<AdminHeading>HomePage Data</AdminHeading>
			<HomePage />
		</main>
	);
};

export default HomePageData;
