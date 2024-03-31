import CourtsList from "@/app/(courts)/courts-list";
import { getCourts } from "@/lib/fetchers/courts-fetcher";
import Script from "next/script";

const CourtsPage =async  () => {

  const {courts, error} = await getCourts();

  return (
			<div>
				<Script
          strategy="beforeInteractive"
					type="text/javascript"
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				/>
				<h1>Courts</h1>
				<div>{courts ? <CourtsList courts={courts} /> : null}</div>
			</div>
		);
};
export default CourtsPage;
