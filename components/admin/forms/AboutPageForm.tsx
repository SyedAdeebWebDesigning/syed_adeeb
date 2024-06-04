"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "../../ui/use-toast";
import { Textarea } from "@nextui-org/react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import CustomInput from "../../shared/input";
import {
	createAboutPageData,
	getAboutPageData,
	updateAboutPageData,
} from "@/actions/aboutpage.action";

/**
 * Component for managing the About Page form.
 * @returns {JSX.Element} The AboutPageForm component.
 */
const AboutPageForm: React.FC = (): JSX.Element => {
	const router = useRouter();
	const [name, setName] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [aboutPageData, setAboutPageData] = useState<any>(null);

	/**
	 * Handles file input change and generates the image URL.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
	 */
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
			generateImageUrl(file);
		}
	};

	/**
	 * Generates a URL for the selected file.
	 * @param {File} file - The selected file.
	 */
	const generateImageUrl = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => setImageUrl(reader.result as string);
		reader.readAsDataURL(file);
	};

	// Adjusted logic for the disabled state of the submit button
	const isDisabled =
		!name || !message || (!selectedFile && !imageUrl && !aboutPageData);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAboutPageData();
				setAboutPageData(result);
			} catch (error) {
				console.error("Error fetching about page data:", error);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (aboutPageData) {
			setName(aboutPageData.name);
			setMessage(aboutPageData.message);
			setImageUrl(aboutPageData.imgUrl);
		}
	}, [aboutPageData]);

	/**
	 * Handles form submission for creating or updating about page data.
	 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
	 */
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = {
				name,
				message,
				imgUrl: imageUrl || aboutPageData.imgUrl || "",
			};

			if (aboutPageData) {
				await updateAboutPageData(aboutPageData.id, data);
				toast({ description: "Data updated successfully", variant: "default" });
			} else {
				await createAboutPageData(data);
				toast({ description: "Data created successfully", variant: "default" });
			}
			router.refresh();
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	return (
		<section className="">
			<div className="px-5 py-24">
				<div className="lg:w-2/4 md:w-2/3 mx-auto rounded-md p-10 relative">
					<form className="flex flex-wrap -m-2" onSubmit={handleSubmit}>
						<div className="p-2 w-full">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0,
								}}>
								<Label className="text-gray-700 dark:text-gray-300 text-sm flex justify-between">
									<p>
										Profile Picture Less than 700Kb{" "}
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
							</motion.div>
						</div>
						<div className="p-2 w-full">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0.6,
								}}>
								<CustomInput
									isRequired
									type="text"
									id="name"
									name="Name"
									onChange={(e) => setName(e.target.value)}
									value={name}
									className="dark:placeholder:text-gray-300 placeholder:text-gray-500"
								/>
							</motion.div>
						</div>
						<div className="p-2 w-full">
							<motion.div
								className="relative"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									stiffness: 50,
									damping: 10,
									type: "spring",
									delay: 0.8,
								}}>
								<Textarea
									className="bg-gray-300 dark:bg-[#3b3b3b] border-none dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white relative"
									placeholder="Write your description here"
									minLength={3}
									maxLength={400}
									value={message}
									rows={6}
									required
									onChange={(e) => setMessage(e.target.value)}
								/>
							</motion.div>
						</div>
						<motion.div
							className="p-2 w-full"
							initial={{ opacity: 0, scale: 0 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								stiffness: 50,
								damping: 10,
								type: "spring",
								delay: 1,
							}}>
							<Button className="w-full" type="submit" disabled={isDisabled}>
								{aboutPageData ? "Update Data" : "Create Data"}
							</Button>
						</motion.div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AboutPageForm;
