import { AdminHeading } from "@/components/admin/AdminHeading";
import HomePage from "@/components/admin/forms/HomePage";

const HomePageData = async () => {
	return (
		<main>
			<AdminHeading>HomePage Data</AdminHeading>
			<HomePage />
		</main>
	);
};

export default HomePageData;
