import type { Database } from "@/schema";
import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";

type SherrifCardProps = {
  sherrif: Database['public']['Functions']['nearest_sherrifs']['Returns'][0]
}

const SherrifCard = ({ sherrif }: SherrifCardProps) => {
	return (
		<div className="rounded-md shadow-md md:flex bg-slate-50">
			<div className="p-2">
				<h2 className="text-2xl font-semibold">
					{sherrif.first_name} {sherrif.last_name}
				</h2>
				<p>Distance: {(sherrif.dist_meters / 1000).toFixed(2)} km</p>
				<div className="mt-5">
					<h4 className="text-lg font-semibold">Contact Information:</h4>
					<p className="text-gray-500">Cell: {sherrif.cell_number}</p>
					<p className="text-gray-500">Office: {sherrif.phone_contact}</p>
					<p className="text-gray-500">Email: {sherrif.email}</p>
					<p className="text-gray-500">Address: {sherrif.address}</p>
				</div>
			</div>
		</div>
	);
};
export default SherrifCard;
