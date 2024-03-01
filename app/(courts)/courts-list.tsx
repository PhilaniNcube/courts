"use client"

import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Database } from "@/schema";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { set } from "zod";


type CourtsListProps = {
  courts: Database['public']['Tables']['courts']['Row'][];
}

const CourtsList = ({ courts }: CourtsListProps) => {

  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "South Africa";


	return (
		<div className="flex flex-row space-x-2 h-[calc(100vh-120px)]">
			<div>
				<ScrollArea className="w-full h-[calc(100vh-150px)] overflow-y-auto">
					<ul className="flex flex-col gap-y-4">
						{courts.map((court) => (
							<Link
               href={{
                pathname: "/dashboard/courts",
                query: {
                  address: court.street_address
                },
               }}
								className="flex flex-col p-3 space-y-2 transition-all duration-300 ease-in-out border-2 rounded-md cursor-pointer border-slate-300 odd:bg-slate-200 hover:bg-slate-300"
								key={court.id}
							>
								<h3>District {court.district}</h3>
								<p>Address: {court.street_address}</p>
								<p className="text-lg font-medium"> {court.court_type} Court</p>
							</Link>
						))}
					</ul>
					<ScrollBar />
				</ScrollArea>
			</div>
			<div className="flex-1 w-full h-[760px]">
				<GoogleMapsEmbed
					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
					height={760}
					width="100%"
					mode="place"
					// maptype="satellite"
					q={address}
				/>
			</div>
		</div>
	);
};
export default CourtsList;
