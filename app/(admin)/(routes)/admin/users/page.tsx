"use client";
import { getUsers, toggleUserRoles } from "@/actions/user.action";
import { AdminHeading } from "@/components/admin/AdminHeading";
import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
type Props = {};

const UsersPage = (props: Props) => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUsers = async () => {
		try {
			const data: User[] = await getUsers();
			setUsers(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<main>
			<AdminHeading>Users Data</AdminHeading>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="w-full lg:w-1/2 mx-auto">
					<Table className="mx-auto">
						<TableHeader>
							<TableRow className="dark:bg-[#353535] bg-[#e3e3e3] border-none">
								<TableHead className="w-[100px]">S.No</TableHead>
								<TableHead className="w-[100px]">Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead className="">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{users.map((user, i) => (
								<TableRow
									key={user.id}
									className={`${
										i % 2 === 0
											? "dark:bg-[#272727] bg-[white]"
											: "dark:bg-[#353535] bg-[#e3e3e3]"
									} border-none`}>
									<TableCell>{i + 1}</TableCell>
									<TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>

									<TableCell>{user.email}</TableCell>
									<TableCell className="text-left">
										<div
											onClick={() => {
												toggleUserRoles(user.id);
												window.location.reload();
											}}
											className="cursor-pointer">
											{user.isAdmin ? (
												<span className="text-green-500">Admin</span>
											) : (
												<span className="text-red-500">User</span>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			)}
		</main>
	);
};

export default UsersPage;
