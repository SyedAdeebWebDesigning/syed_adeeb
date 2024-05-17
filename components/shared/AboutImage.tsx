"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { easeIn, motion } from "framer-motion";

export default function AboutImage({ imgUrl }: { imgUrl: string }) {
	return (
		<CardContainer className="inter-var py-1">
			<CardBody className="relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6">
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
							src={`${imgUrl}`}
							height="700"
							width="700"
							className="h-full w-full object-cover rounded-tl-[20%] rounded-tr-[4%] rounded-bl-[4%] rounded-br-[20%] group-hover/card:shadow-xl bg-[#d7d7d7] dark:bg-[#1f1f1f] "
							alt="thumbnail"
						/>
					</motion.div>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
}
