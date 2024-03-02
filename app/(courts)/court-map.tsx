"use client"

import { useSearchParams } from "next/navigation";
import {useState, useRef, useMemo} from "react";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import  {APIProvider, Map, AdvancedMarker, Pin, InfoWindow} from "@vis.gl/react-google-maps";

type CourtMapProps = {
  lat: number;
  lng: number;
};


const CourtMap = ({ lat = -32.7072613, lng = 26.2934731 }: CourtMapProps) => {
	const position = { lat, lng };
	const searchParams = useSearchParams();
	const address = searchParams.get("address") || "South Africa";
  const [isOpen, setIsOpen] = useState(false);

	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<div className="h-[750px]">
				<Map zoom={18} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
					<AdvancedMarker position={position} onClick={() => setIsOpen(true)}>
            <Pin />
          </AdvancedMarker>

				</Map>
			</div>
		</APIProvider>
	);
};
export default CourtMap;
