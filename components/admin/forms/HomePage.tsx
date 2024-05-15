"use client";
import {
	createHomePageData,
	updateHomePageData,
} from "@/actions/homepage.action";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { toast } from "@/components/ui/use-toast";
import { createSocialIcon } from "@/actions/socialIcons.action";
import { HomePageData, SocialIcons } from "@prisma/client";

type HomePageProps = {
	socialIcons: SocialIcons[];
	homePageData: HomePageData | null;
};

const HomePage: React.FC<HomePageProps> = ({ socialIcons, homePageData }) => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [tagLine, setTagLine] = useState<string>("");

	const [socialLinks, setSocialLinks] = useState<string>("");

	// Set initial state from homePageData if available
	useEffect(() => {
		if (homePageData) {
			setFirstName(homePageData.firstName);
			setLastName(homePageData.lastName);
			setTagLine(homePageData.tagline);
		}
	}, [homePageData]);

	const handleAddSocialLink = async (url: string) => {
		try {
			if (!socialLinks.trim()) {
				return toast({
					description: "Please enter a valid URL",
					variant: "destructive",
				});
			}

			await createSocialIcon({ url });
			toast({
				description: "Social Link added successfully",
				variant: "default",
			});
			setSocialLinks(""); // Clear the input field after adding
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = {
				firstName,
				lastName,
				tagline: tagLine,
			};

			if (homePageData) {
				// Update existing data
				await updateHomePageData(homePageData.id, data);
				toast({ description: "Data updated successfully", variant: "default" });
			} else {
				// Create new data
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

				<div className="flex w-full space-x-2">
					<CustomInput
						type="text"
						id="socialLink"
						isRequired={false}
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

				<div className="mt-4 flex space-x-2 flex-wrap">
					{socialIcons?.map((icons) => (
						<div key={icons.id}>
							<SocialIcon url={icons.url} />
						</div>
					))}
				</div>
			</div>
		</form>
	);
};

export default HomePage;
