import AboutHeading from "@/components/shared/AboutHeading";
import AboutImage from "@/components/shared/AboutImage";
import Bounded from "@/components/shared/Bounded";
import Heading from "@/components/shared/heading";

const AboutPage = () => {
	return (
		<main>
			<Bounded>
				<Heading>About</Heading>
				<section className="grid grid-cols-1 grid-rows-none lg:grid-cols-2 mt-10">
					<div className="mx-auto mt-10 order-1 lg:order-none">
						<AboutHeading />
					</div>
					<div className="mx-auto ">
						<AboutImage />
					</div>
				</section>
			</Bounded>
		</main>
	);
};

export default AboutPage;
