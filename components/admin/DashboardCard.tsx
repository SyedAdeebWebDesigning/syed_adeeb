import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const DashboardCard = ({
	title,
	href,
}: {
	title: string;
	href: string;
}) => {
	return (
		<Link href={href}>
			<Card className="bg-gradient-to-tr from-teal-400 to-emerald-400 dark:from-teal-700 dark:to-emerald-700  transition duration-300 ease-linear">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			</Card>
		</Link>
	);
};
