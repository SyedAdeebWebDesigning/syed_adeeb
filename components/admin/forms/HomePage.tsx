"use client";
import {
	createHomePageData,
	getHomePageData,
	updateHomePageData,
} from "@/actions/homepage.action";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { toast } from "@/components/ui/use-toast";
import {
	createSocialIcon,
	deleteSocialIcon,
	getSocialIcons,
} from "@/actions/socialIcons.action";
import { HomePageData, SocialIcons } from "@prisma/client";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

/**
 * HomePage component
 * @returns {JSX.Element} The HomePage component.
 */
const HomePage: React.FC = (): JSX.Element => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [tagLine, setTagLine] = useState<string>("");
	const [socialLinks, setSocialLinks] = useState<string>("");
	const [socialIcons, setSocialIcons] = useState<SocialIcons[]>([]);
	const [homePageData, setHomePageData] = useState<HomePageData | null>(null);

	const router = useRouter();

	/**
	 * Fetches home page data and social icons data when the component mounts.
	 */
	useEffect(() => {
		const fetchData = async () => {
			try {
				const homeData = await getHomePageData();
				const socialData = await getSocialIcons();
				setHomePageData(homeData);
				setSocialIcons(socialData);
				if (homeData) {
					setFirstName(homeData.firstName);
					setLastName(homeData.lastName);
					setTagLine(homeData.tagline);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	/**
	 * Handles adding a new social link.
	 * @param {string} url - The URL of the social link.
	 */
	const handleAddSocialLink = async (url: string) => {
		if (!socialLinks.trim()) {
			return toast({
				description: "Please enter a valid URL",
				variant: "destructive",
			});
		}
		try {
			const newIcon = await createSocialIcon({ url });
			toast({
				description: "Social Link added successfully",
				variant: "default",
			});
			setSocialIcons((prevIcons) => [...prevIcons, newIcon]);
			setSocialLinks(""); // Clear the input field after adding
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	/**
	 * Handles deleting a social link.
	 * @param {string} id - The ID of the social link to delete.
	 */
	const handleDeleteSocialLink = async (id: string) => {
		try {
			await deleteSocialIcon(id);
			toast({
				description: "Social Link deleted successfully",
				variant: "default",
			});
			setSocialIcons((prevIcons) => prevIcons.filter((icon) => icon.id !== id));
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	/**
	 * Handles form submission for creating or updating home page data.
	 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = { firstName, lastName, tagline: tagLine };
		try {
			if (homePageData) {
				await updateHomePageData(homePageData.id, data);
				toast({ description: "Data updated successfully", variant: "default" });
			} else {
				await createHomePageData(data);
				toast({ description: "Data created successfully", variant: "default" });
			}
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	return (
		<form className="justify-center flex" onSubmit={handleSubmit}>
			<div className="w-1/2 flex flex-col justify-center my-10 space-y-2">
				<div className="flex space-x-2">
					<CustomInput
						type="text"
						id="firstName"
						isRequired
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
						name="First Name"
					/>
					<CustomInput
						type="text"
						id="lastName"
						isRequired
						onChange={(e) => setLastName(e.target.value)}
						value={lastName}
						name="Last Name"
					/>
				</div>
				<div>
					<CustomInput
						type="text"
						id="tagLine"
						isRequired
						onChange={(e) => setTagLine(e.target.value)}
						value={tagLine}
						name="Tagline"
					/>
				</div>
				<Button type="submit" className="w-full">
					{homePageData ? "Update Data" : "Create Data"}
				</Button>

				<div className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-2">
					<CustomInput
						type="text"
						id="socialLink"
						onChange={(e) => setSocialLinks(e.target.value)}
						value={socialLinks}
						name="Social Link"
					/>
					<Button
						type="button"
						onClick={() => handleAddSocialLink(socialLinks)}>
						Add Social Link
					</Button>
				</div>

				<div className="mt-4 grid md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-1 xl:grid-cols-8">
					{socialIcons.map((icons) => (
						<div key={icons.id} className="relative group">
							<SocialIcon url={icons.url} target="_blank" />
							<div
								className="absolute top-0 right-5 invisible group-hover:visible cursor-pointer transition-all duration-200 ease-in-out"
								onClick={() => handleDeleteSocialLink(icons.id)}>
								<RxCross2 size={25} className="rounded-full p-1 bg-red-500" />
							</div>
						</div>
					))}
				</div>
			</div>
		</form>
	);
};

export default HomePage;
