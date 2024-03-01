"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { easeIn, motion } from "framer-motion";

export default function Shapes() {
	return (
		<CardContainer className="inter-var">
			<CardBody className="relative group/card  w-auto sm:w-[30rem] h-auto rounded-xl p-6">
				<CardItem translateZ="100" translateX={1} className="w-full mt-4">
					<motion.div
						initial={{ x: 100, opacity: 0 }}
						animate={{
							x: 0,
							opacity: 1,
							transition: {
								type: "spring",
								stiffness: 150,
								damping: 7,
								duration: 1.2,
							},
						}}>
						<Image
							src="/vscode.webp"
							height="400"
							width="400"
							className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
						/>
					</motion.div>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
}
