import React from "react";
import { Input } from "@/components/ui/input";

type Props = {
	type: string;
	id: string;
	name: string;
	value: string;
	onChange: (e: any) => void;
	isRequired: boolean;
};

const CustomInput = ({
	type,
	id,
	name,
	value,
	onChange,
	isRequired,
}: Props) => {
	return (
		<Input
			type={type}
			id={id}
			required={isRequired}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
			className="bg-gray-300 dark:bg-[#3b3b3b] border-none dark:placeholder:text-gray-300 placeholder:text-gray-800 text-gray-800 dark:text-white"
		/>
	);
};

export default CustomInput;
