"use client";
import { getMessages } from "@/actions/messages.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { Messages } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

type Props = {};

const MessagesDataPage = (props: Props) => {
	const [messages, setMessages] = useState<undefined | Messages[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchMessages = async () => {
		try {
			const data = await getMessages();
			setMessages(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMessages();
	}, []);

	return (
		<main>
			<AdminHeading>Messages</AdminHeading>
			{isLoading ? (
				<div className="text-center">Loading Messages ...</div>
			) : (
				<div>
					{messages && messages.length > 0 ? (
						<div>
							<div className="max-h-[75vh] overflow-y-auto">
								{messages.map((message) => (
									<div key={message.id} className="flex flex-col my-2">
										<div className="flex justify-between w-full md:w-1/2 lg:w-1/3 mx-auto bg-gray-300 py-2 px-2 dark:bg-[#313131] rounded-xl items-center">
											<div className="flex flex-col w-full mx-2 p-4">
												<div className="flex justify-between w-full items-center mb-2">
													<p className="text-sm font-bold">{message.name}</p>
													<p className="text-xs">{message.email}</p>
													<p className="text-xs">
														{formatDistanceToNow(new Date(message.createdAt), {
															addSuffix: true,
														})}
													</p>
												</div>
												<p className="text-xs">{message.suggestion}</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<div>
							<div className="text-center">No Messages Found</div>
						</div>
					)}
				</div>
			)}
		</main>
	);
};

export default MessagesDataPage;
