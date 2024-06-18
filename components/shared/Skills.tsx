"use client";
import React, { useEffect, useState } from "react";
import { default as CircularProgress } from "@/components/progress/GradientCircleProgressbar";
import { getSkills } from "@/actions/skills.action";
import { Skills } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FollowerPointerCard } from "../ui/following-pointer";
import Loading from "../loading";

const Skills = () => {
	const [skillsData, setSkillsData] = useState<Skills[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchSkillsData = async () => {
		try {
			const data = await getSkills();
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

	return (
		<div className="">
			{isLoading ? (
				<div className="text-center">Loading ...</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
					{skillsData.map((skill, i) => (
						<motion.div
							key={skill.id}
							initial={{ scale: 0, opacity: 0 }}
							className="flex justify-center items-center mx-auto rounded-full"
							animate={{
								scale: 1,
								opacity: 1,
								transition: {
									delay: 0.1 * i,
									type: "spring",
									stiffness: 120,
									damping: 10,
								},
							}}>
							<CircularProgress
								percentage={parseInt(skill.percentage)}
								strokeWidth={10}
								title={skill.title}
								primaryColor={["#13b881", "#13b881"]}
								secondaryColor={"#333"}
								imageUrl={skill.imgUrl}
							/>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
};

export default Skills;
