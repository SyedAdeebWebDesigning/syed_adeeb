"use client";

import { addTimelineItem } from "@/actions/timeline.action";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

type Props = {};

const TimelinePageForm = (props: Props) => {
	const [date, setDate] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = {
				date,
				title,
				description,
			};
			await addTimelineItem(data);
			setDate("");
			setTitle("");
			setDescription("");
			toast({
				description: "Timeline data created successfully",
				variant: "default",
			});
		} catch (error) {
			toast({
				description: "Error creating timeline data",
				variant: "destructive",
			});
		} finally {
			router.push("/admin/timeline-data");
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
								name="Enter Date (2023 - Present)"
								id="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
							/>
							<CustomInput
								type="text"
								name="Enter title (Full Stack Developer)"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<Textarea
							className="bg-gray-300 my-2 dark:bg-[#3b3b3b] border-none rounded-md dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white relative"
							placeholder="Write your description here"
							minLength={3}
							maxLength={400}
							rows={6}
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
						<Button className="w-full" type="submit">
							Create Timeline Data
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default TimelinePageForm;
