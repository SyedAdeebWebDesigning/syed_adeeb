"use client";
import { createSkill } from "@/actions/skills.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const NewSkillDataPage = (props: Props) => {
	const router = useRouter();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [skillName, setSkillName] = useState<string>("");
	const [skillPercentage, setSkillPercentage] = useState<number>(0);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			generateImageUrl(file);
		}
	};

	const generateImageUrl = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => setImageUrl(reader.result as string);
		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data:
				| {
						skillName: string;
						skillPercentage: number;
						imageUrl: string | null;
				  }
				| any = {
				title: skillName,
				percentage: JSON.stringify(skillPercentage),
				imgUrl: imageUrl,
			};
			await createSkill(data);
			toast({
				description: "Skill data created successfully",
				variant: "default",
			});
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
			console.log(error.message);
		} finally {
			router.push("/admin/skills-data");
		}
	};
	return (
		<main>
			<div className="flex items-center justify-between">
				<ChevronLeft
					className="size-9 hover:bg-gray-100 hover:text-gray-700 p-1 rounded-full transition-all duration-300 ease-in-out cursor-pointer"
					onClick={() => {
						router.back();
					}}
				/>
				<AdminHeading>Create project data</AdminHeading>
				<ChevronLeft className="invisible" />
			</div>
			<form
				className="lg:w-2/4 w-1/1 md:w-2/3 mx-auto rounded-md sm:p-10 relative"
				onSubmit={handleSubmit}>
				<div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
					<CustomInput
						type="text"
						name="Skill Name"
						id="name"
						value={skillName}
						onChange={(e) => setSkillName(e.target.value)}
						isRequired
					/>
					<CustomInput
						type="number"
						min={0}
						max={100}
						name="Skill percentage"
						id="percentage"
						value={skillPercentage}
						onChange={(e) => setSkillPercentage(parseInt(e.target.value))}
						isRequired
					/>
				</div>
				<div className="relative my-2">
					<Label className="text-gray-700 dark:text-gray-300 text-sm flex justify-between">
						<p>
							Project Image (Less than 700Kb){" "}
							{selectedFile && selectedFile.size > 700 * 1024 ? (
								<span className="text-red-500">
									Size Exceeded (
									{selectedFile && Math.floor(selectedFile.size / 1024)}
									Kb)
								</span>
							) : (
								<span className="text-green-500">
									Size Normal (
									{selectedFile && Math.floor(selectedFile.size / 1024)}
									Kb)
								</span>
							)}
						</p>
					</Label>
					<Input
						maxLength={700}
						type="file"
						onChange={handleFileChange}
						accept="image/*"
						className="bg-gray-300 dark:bg-[#3b3b3b] border-none dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white"
					/>
				</div>
				<Button className="w-full" type="submit">
					Create Skill Data
				</Button>
			</form>
		</main>
	);
};

export default NewSkillDataPage;
