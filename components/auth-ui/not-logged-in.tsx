import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export default function NotLoggedIn() {
	return (
		<div className="flex items-center justify-center min-h-[800px]">
			<Card className="mx-auto max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">
						You're Not Logged In
					</CardTitle>
					<CardDescription>
						Please log in to continue to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center space-y-4">
					<UserIcon className="h-24 w-24 text-gray-500 dark:text-gray-400" />
					<Link
						className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
						href="/login"
					>
						Log In
					</Link>
				</CardContent>
			</Card>
		</div>
	);
}

