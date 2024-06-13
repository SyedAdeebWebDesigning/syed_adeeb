"use client";
import React from "react";
import { Button } from "../ui/button";

type Props = {
	title: string;
	buttonText: string;
	link: string;
};

const HandleNoData = ({ title, buttonText, link }: Props) => {
	const handleRedirect = (link: string) => {
		window.location.href = link;
	};
	return (
		<div className="flex flex-col space-y-2 items-center justify-center mt-10">
			<h1>{title}</h1>
			<Button onClick={() => handleRedirect(link)}>{buttonText}</Button>
		</div>
	);
};

export default HandleNoData;
