import { getNearestCourts } from "@/lib/fetchers/courts-fetcher";
import CourtCard from "./court-card";
import { Separator } from "@/components/ui/separator";

const NearestCourts = async ({address}:{address:string}) => {

  const {error, data} = await getNearestCourts(address);

  if (error) {
    return <div>{error}</div>
  }



		return (
			<div>
        <h1 className="text-2xl font-bold">Nearest Courts to {address}</h1>
        <Separator className="my-3" />
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{data?.map((court) => <CourtCard court={court} />)}
				</div>
			</div>
		);
};
export default NearestCourts;
