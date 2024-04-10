/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X8S99IKxtQy
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import { LocateIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function CourtCard({court}:{court:{
  id: string;
  office: string;
  court_type: string;
  tel: string;
  lat: number;
  long: number;
  dist_meters: number;
}}) {

  const distance = `${(court?.dist_meters / 1000).toFixed(2)} km`;

	return (
    <Link href={`/dashboard/courts/${court?.id}`}>
		<Card className="w-full max-w-md hover:bg-slate-50">
			<CardHeader>
				<CardTitle>{court.office} {court.court_type} Court</CardTitle>
				<CardDescription>{court.court_type} Court</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2">
				<div className="flex items-center gap-2">
					<PhoneIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					<span>{court.tel}</span>
				</div>
				<div className="flex items-center gap-2">
					<LocateIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					<span>Distance: {distance}</span>
				</div>
			</CardContent>
		</Card>
    </Link>
	);
}

