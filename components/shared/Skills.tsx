"use client";
import React from "react";
import { default as CircularProgress } from "@/components/progress/GradientCircleProgressbar";
const Skills = () => {
	const percentage = 66;
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<CircularProgress
				percentage={percentage}
				strokeWidth={10}
				primaryColor={["#13b881", "#13b881"]}
				secondaryColor={"#333"}
				imageUrl={"/skills/typescript.webp"}
			/>
		</div>
	);
};

export default Skills;
