import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
	return (
		<div className="container mx-auto absolute top-[45%] right-[15%]  flex justify-center items-center">
			<div className="grid place-items-center h-full">
				<Loader2 className="size-16 rotate-infinite text-teal-500" />
			</div>
		</div>
	);
};

export default Loading;
