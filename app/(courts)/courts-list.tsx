import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Database } from "@/schema";
import { GoogleMapsEmbed } from "@next/third-parties/google";


type CourtsListProps = {
  courts: Database['public']['Tables']['courts']['Row'][];
}

const CourtsList = ({ courts }: CourtsListProps) => {
	return (
		<div className="flex flex-row space-x-2 h-[calc(100vh-120px)]">
			<div>
				<ScrollArea className="w-full h-[calc(100vh-150px)] overflow-y-auto">
					<ul className="flex flex-col gap-y-4">
						{courts.map((court) => (
							<div
								className="flex flex-col p-3 space-y-2 border-2 rounded-md border-slate-300 odd:bg-slate-200"
								key={court.id}
							>
								<h3>District {court.district}</h3>
								<p>Address: {court.street_address}</p>
								<p className="text-lg font-medium"> {court.court_type} Court</p>
							</div>
						))}
					</ul>
          <ScrollBar />
				</ScrollArea>
			</div>
			<div className="flex-1 w-full h-[750px]">
				<GoogleMapsEmbed
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
					height={750}
					width="100%"
					mode="place"
					// maptype="satellite"
					q={courts[5].street_address || "Johannesburg"}
				/>
			</div>
		</div>
	);
};
export default CourtsList;
