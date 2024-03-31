"use client"

import { useSearchParams } from "next/navigation";
import {useState, useRef, useMemo, Suspense} from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import  {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";
import { GoogleMapsEmbed } from "@next/third-parties/google";

type CourtMapProps = {
  lat: number;
  lng: number;
};


const CourtMap = ({ lat = -32.7072613, lng = 26.2934731 }: CourtMapProps) => {
	const position = { lat, lng };
	const searchParams = useSearchParams();
	const address = searchParams.get("address") || "South Africa";
  const [isOpen, setIsOpen] = useState(false);
  const [center, setCenter] = useState({ lat, lng });

	return (
		// <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
		// 	<div className="h-[750px]">
		// 		<Map
		// 			zoom={18}
		// 			onDrag={(event) => {
		// 				console.log("Dragging");
		// 				console.log(event);
		// 			}}
		// 			center={center}
		// 			mapId={process.env.NEXT_PUBLIC_MAP_ID}
		// 		>
		// 			<AdvancedMarker position={center} onClick={() => setIsOpen(true)}>
		// 				<Pin />
		// 			</AdvancedMarker>
		// 		</Map>
		// 	</div>
		// </APIProvider>
		<Suspense fallback={<div className="flex items-center justify-center w-full h-full">
      Loading...
    </div>}>
			<GoogleMapsEmbed
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
				height="650px"
				width="100%"
				mode="place"
				q={address}
			/>
		</Suspense>
	);
};
export default CourtMap;
