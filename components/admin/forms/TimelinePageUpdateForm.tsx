/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
	addTimelineItem,
	getTimelineItem,
	updateTimelineItem,
} from "@/actions/timeline.action";
import CustomInput from "@/components/shared/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Timeline } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
	id: string;
};

const TimelinePageUpdateForm: React.FC<Props> = ({ id }: Props) => {
	const [timelineData, setTimelineData] = useState<Timeline | null>(null);
	const [date, setDate] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data: Timeline | any = await getTimelineItem(id);
				if (data) {
					setTimelineData(data);
					setDate(data.date || "");
					setTitle(data.title || "");
					setDescription(data.description || "");
				}
			} catch (error) {
				toast({
					description: "Error fetching timeline data",
					variant: "destructive",
				});
			}
		};
		fetchData();
	}, [id]); // Add `id` to dependency array to fetch data when `id` changes

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const newData = {
				date,
				title,
				description,
			};
			await updateTimelineItem(id, newData);
			toast({
				description: "Timeline data updated successfully",
				variant: "default",
			});
			router.push("/admin/timeline-data");
		} catch (error) {
			toast({
				description: "Error updating timeline data",
				variant: "destructive",
			});
		}
	};

	if (!timelineData) {
		return <p>Loading...</p>; // Handle loading state while fetching data
	}

	return (
		<section className="">
			<div className="sm:px-5 py-24">
				<div className="lg:w-2/4 w-full md:w-2/3 mx-auto rounded-md sm:p-10 relative">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
							<CustomInput
								type="text"
								name="Enter Date (2023 - Present)"
								id="date"
								value={date}
								onChange={(e) => setDate(e.target.value)}
								isRequired
							/>
							<CustomInput
								type="text"
								name="Enter Title (Full Stack Developer)"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								isRequired
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
							Update Timeline Data {title}
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default TimelinePageUpdateForm;
