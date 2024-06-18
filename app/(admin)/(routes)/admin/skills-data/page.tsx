"use client";
import { getSkills } from "@/actions/skills.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import HandleNoData from "@/components/admin/handleNoData";
import { Button } from "@/components/ui/button";
import { Skills } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Props = {};

const SkillsDataPage = (props: Props) => {
	const [skillsData, setSkillsData] = useState<Skills[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const fetchSkillsData = async () => {
		try {
			const data: Skills[] = await getSkills();
			setSkillsData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSkillsData();
	}, []);

	const SkeletonCard = () => (
		<div className="flex my-2 w-full md:w-1/2 lg:w-1/3 mx-auto bg-gray-300 py-1 px-2 dark:bg-[#313131] rounded-full items-center animate-pulse">
			<div className="rounded-full bg-gray-400 size-10"></div>
			<div className="flex-1 bg-gray-400 h-4 mx-4 my-1 rounded"></div>
			<div className="bg-gray-400 h-4 w-12 rounded"></div>
		</div>
	);
	return (
		<main>
			<AdminHeading>Skills Data</AdminHeading>
			{isLoading ? (
				<div>
					<div className="max-h-[75vh] overflow-y-auto">
						{[...Array(15)].map((_, index) => (
							<SkeletonCard key={index} />
						))}
					</div>
				</div>
			) : (
				<div>
					{skillsData && skillsData.length > 0 ? (
						<div>
							<div className="max-h-[75vh] overflow-y-auto">
								{skillsData.map((skill) => (
									<Link
										key={skill.id}
										className="flex flex-col my-2"
										href={`/admin/skills-data/${skill.id}`}>
										<div className="flex justify-between w-full md:w-1/2 lg:w-1/3 mx-auto bg-gray-300 py-2 px-2 dark:bg-[#313131] rounded-full items-center">
											<picture>
												<img
													src={skill.imgUrl}
													alt=""
													loading="lazy"
													width={30}
													height={30}
													className="rounded-full object-contain"
												/>
											</picture>
											<div>{skill.title}</div>
											<div>{skill.percentage}%</div>
										</div>
									</Link>
								))}
							</div>

							<Link href={"/admin/skills-data/new"}>
								<div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
									<Button className="w-full rounded-full">Add new data</Button>
								</div>
							</Link>
						</div>
					) : (
						<div>
							<HandleNoData
								title="No skills data"
								buttonText="Add new skill data"
								link="/admin/skills-data/new"
							/>
						</div>
					)}
				</div>
			)}
		</main>
	);
};

export default SkillsDataPage;
