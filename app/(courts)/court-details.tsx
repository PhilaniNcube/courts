import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import { getCourt } from "@/lib/fetchers/courts-fetcher";
import type { Database } from "@/schema";
import { LocateIcon, MapIcon, PhoneIcon, ShapesIcon } from "lucide-react";

// Define the prop types
type CourtDetailsProps = {
	court: Database['public']['Tables']['courts']['Row']
};

const CourtDetails = ({ court }: CourtDetailsProps) => {
	return (
		<div>
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>
						{court.district} {court.court_type} Court
					</CardTitle>
					<CardDescription>{court.postal_address}</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="flex items-center gap-2">
						<LocateIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
						<span>{court.street_address}</span>
					</div>
					<div className="flex items-center gap-2">
						<PhoneIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
						<span>{court.tel}</span>
					</div>
					<div className="flex items-center gap-2">
						<MapIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
						<span>{court.province}</span>
					</div>
					<div className="flex items-center gap-2">
						<ShapesIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
						<span>{court.office}</span>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
export default CourtDetails;
