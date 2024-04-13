import NavBar from "@/components/shared/NavBar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex w-full items-center justify-center h-screen">
			{children}
		</div>
	);
};

export default AuthLayout;
