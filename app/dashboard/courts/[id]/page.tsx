import CourtDetails from "@/app/(courts)/court-details";
import NearestSherrifs from "@/app/(sherrifs)/nearest-sherrifs";
import { getCourt } from "@/lib/fetchers/courts-fetcher";
import { Suspense } from "react";

const page = async ({params:{id}}:{params:{id:string}}) => {

    const {court, error} = await getCourt(id);

  if (error || !court) {
    return <div>{error}</div>;
  }

  return (
			<div className="flex space-x-3">
				<div>
					<CourtDetails court={court} />
					<Suspense fallback={<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg aspect-video animate-pulse" />
            <div className="rounded-lg aspect-video animate-pulse" />
            <div className="rounded-lg aspect-video animate-pulse" />
            <div className="rounded-lg aspect-video animate-pulse" />
            <div className="rounded-lg aspect-video animate-pulse" />
            <div className="rounded-lg aspect-video animate-pulse" />
          </div>}>
						{court.lng !== null && court.lat !== null ? (
							<NearestSherrifs lat={court?.lat} lng={court?.lng} />
						) : null}
					</Suspense>
				</div>
			</div>
		);
};
export default page;
