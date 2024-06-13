import { AdminHeading } from "@/components/admin/AdminHeading";
import TimelinePageForm from "@/components/admin/forms/TimelinePageForm";
import React from "react";

type Props = {};

const NewTimelinePage = (props: Props) => {
	return (
		<main>
			<AdminHeading>Create timeline data</AdminHeading>
			<TimelinePageForm />
		</main>
	);
};

export default NewTimelinePage;
