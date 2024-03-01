"use client"

import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import { Database } from "@/schema";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useState } from "react";
import { set } from "zod";
import CourtMap from "./court-map";


type CourtsListProps = {
  courts: Database['public']['Tables']['courts']['Row'][];
}

const CourtsList = ({ courts }: CourtsListProps) => {

  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "South Africa";
  const lat = parseFloat(searchParams.get("lat") || "-33.5298798");
  const lng = parseFloat(searchParams.get("lng") || "25.7126677");


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
                  address: court.street_address,
                  lat: court.lat,
                  lng: court.lng
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
			 <CourtMap lat={lat} lng={lng} />
			</div>
		</div>
	);
};
export default CourtsList;
