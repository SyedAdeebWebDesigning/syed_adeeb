"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProject } from "@/actions/projects.action";

type Props = {};

const ProjectPageForm = (props: Props) => {
	const [title, setTitle] = useState<string>("");
	const [link, setLink] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isFeatured, setIsFeatured] = useState<boolean>(false);

	const router = useRouter();

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
			const data = {
				title,
				link,
				description,
				imgUrl: imageUrl,
				isFeatured,
			};
			await createProject({
				...data,
				imgUrl: imageUrl || "", // Set imgUrl to an empty string if it is null
			});
		} catch (error) {
			console.log(error);
		} finally {
			toast({ description: "Data created successfully", variant: "default" });
			setTitle("");
			setLink("");
			setDescription("");
			setSelectedFile(null);
			setImageUrl(null);
			setIsFeatured(false);
			router.push("/admin/projects-data");
		}
	};

	return (
		<section className="">
			<div className="sm:px-5 py-24">
				<div className="lg:w-2/4 w-1/1 md:w-2/3 mx-auto rounded-md sm:p-10 relative">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
							<CustomInput
								type="text"
								name="Enter Title"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								isRequired
							/>
							<CustomInput
								type="text"
								name="Enter Link"
								id="link"
								value={link}
								onChange={(e) => setLink(e.target.value)}
								isRequired
							/>
						</div>
						<Textarea
							className="bg-gray-300 my-2 dark:bg-[#3b3b3b] border-none rounded-md dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white relative"
							placeholder="Write your description here"
							minLength={3}
							maxLength={2000}
							rows={6}
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<div className="p-2 w-full">
							<div className="relative">
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
						</div>
						<div className="p-2 w-full">
							<label className="flex items-center space-x-2">
								<input
									type="checkbox"
									checked={isFeatured}
									onChange={(e) => setIsFeatured(e.target.checked)}
									className="form-checkbox h-5 w-5 text-gray-600"
								/>
								<span className="text-gray-700 dark:text-gray-300">
									Featured Project
								</span>
							</label>
						</div>
						<Button className="w-full" type="submit">
							Create Project Data
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ProjectPageForm;
