"use client";
import CustomInput from "../../shared/input";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useRouter } from "next/navigation";
import { toast } from "../../ui/use-toast";
import { Textarea } from "@nextui-org/react";
import {
	createAboutPageData,
	getAboutPageData,
	updateAboutPageData,
} from "@/actions/aboutpage.action";

export const AboutPageForm = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	// Function to handle file input change
	const handleFileChange = (event: any) => {
		const file = event.target.files[0];

		setSelectedFile(file);
		generateImageUrl(file);
	};

	// Function to generate URL for the selected file
	const generateImageUrl = (file: any) => {
		const reader: any = new FileReader();
		reader.onload = () => {
			setImageUrl(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const disabled: boolean = !name || !message || !selectedFile || !imageUrl;

	const [aboutPageData, setAboutPageData] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getAboutPageData();
				setAboutPageData(result);
			} catch (error) {
				console.error("Error fetching home page data:", error);
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

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			const data = {
				name,
				message,
				imgUrl: imageUrl || "", // Set a default value of an empty string if imageUrl is null
			};

			if (aboutPageData) {
				// Update the existing data
				await updateAboutPageData(aboutPageData.id, data);
				toast({ description: "Data updated successfully", variant: "default" });
				router.refresh();
			} else {
				// Create new data
				await createAboutPageData(data);
				toast({ description: "Data created successfully", variant: "default" });
				router.refresh();
			}
		} catch (error: any) {
			toast({ description: error.message, variant: "destructive" });
		}
	};

	return (
		<section className="">
			<div className="px-5 py-24 ">
				<div className="lg:w-2/4 md:w-2/3 mx-auto rounded-md p-10 relative">
					<form className="flex flex-wrap -m-2 ">
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
									required
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
							{aboutPageData ? (
								<>
									<Button className="w-full" onClick={handleSubmit}>
										Update data
									</Button>
								</>
							) : (
								<>
									<Button
										className="w-full"
										onClick={handleSubmit}
										disabled={disabled}>
										Create data
									</Button>
								</>
							)}
						</motion.div>
					</form>
				</div>
			</div>
		</section>
	);
};
