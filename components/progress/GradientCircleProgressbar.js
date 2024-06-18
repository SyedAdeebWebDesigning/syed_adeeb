import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

const CircleContainer = styled.div`
	display: inline-block;
	border-radius: 100%;
	position: relative;
`;

const PercentageContainer = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
`;

const StyledCircle = styled(motion.circle)`
	transform-origin: 50% 50%;
`;

const GradientCircleProgressbar = ({
	percentage,
	width,
	strokeWidth,
	fontSize,
	fontColor,
	fontFamily,
	primaryColor,
	secondaryColor,
	title,
	fill,
	hidePercentageText,
	strokeLinecap,
	imageUrl,
}) => {
	const PI = 3.14;
	const R = width / 2 - strokeWidth * 2;

	const circumference = 2 * PI * R;
	const offset = circumference - (percentage / 100) * circumference;
	const gradientId = `${primaryColor[0]}${primaryColor[1]}`.replace(/#/g, "");

	const circleControls = useAnimation();
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		circleControls.start({
			strokeDashoffset: offset,
			transition: { type: "tween", duration: 1, ease: "easeInOut" },
		});
	}, [offset, circleControls]);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<CircleContainer
			className="react-super-progressbar__base"
			style={{
				height: `${width}px`,
				width: `${width}px`,
			}}>
			{!hidePercentageText && (
				<PercentageContainer>
					<div className="relative text-center mx-auto">
						<Image
							src={imageUrl}
							alt="Progress Image"
							width={140}
							height={140}
							className="rounded-full"
							objectFit="contain"
						/>

						<div className="text-4xl font-semibold w-full h-full bg-emerald-500 backdrop-blur-md rounded-full opacity-0 hover:opacity-100 transition-all duration-150 ease-in-out absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  text-center">
							<div className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
								{percentage}%<div className="text-sm">{title}</div>
							</div>
						</div>
					</div>
				</PercentageContainer>
			)}

			<svg
				width="100%"
				height="100%"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg">
				<linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={primaryColor[0]} />
					<stop offset="100%" stopColor={primaryColor[1]} />
				</linearGradient>
				<circle
					strokeWidth={strokeWidth}
					fill="transparent"
					r={R}
					cx={width / 2}
					cy={width / 2}
					stroke={secondaryColor}
					strokeDasharray={`${circumference} ${circumference}`}
				/>
				<StyledCircle
					strokeWidth={strokeWidth}
					fill={fill}
					r={R}
					cx={width / 2}
					cy={width / 2}
					stroke={`url(#${gradientId})`}
					strokeLinecap={strokeLinecap}
					strokeDasharray={`${circumference} ${circumference}`}
					initial={{ strokeDashoffset: circumference }}
					animate={circleControls}
					transition={{ type: "tween", duration: 1, ease: "easeInOut" }}
					transform="rotate(-90, 0, 0)"
				/>
			</svg>
		</CircleContainer>
	);
};

GradientCircleProgressbar.propTypes = {
	percentage: PropTypes.number.isRequired,
	width: PropTypes.number,
	strokeWidth: PropTypes.number,
	strokeLinecap: PropTypes.oneOf(["round", "square", "butt"]),
	fontSize: PropTypes.string,
	fontColor: PropTypes.string,
	fontFamily: PropTypes.string,
	primaryColor: PropTypes.array,
	secondaryColor: PropTypes.string,
	fill: PropTypes.string,
	hidePercentageText: PropTypes.bool,
	imageUrl: PropTypes.string,
};

GradientCircleProgressbar.defaultProps = {
	width: 200,
	strokeWidth: 5,
	strokeLinecap: "round",
	fontSize: "inherit",
	fontColor: "inherit",
	fontFamily: "inherit",
	primaryColor: ["#00BBFF", "#92d7f1"],
	secondaryColor: "transparent",
	fill: "transparent",
};

export default GradientCircleProgressbar;
