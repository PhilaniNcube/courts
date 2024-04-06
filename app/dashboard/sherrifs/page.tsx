import FailedFetch from "@/app/(error)/failed-fetch";
import AddSherrif from "@/app/(sherrifs)/add-sherrif";
import SherrifSummaryTable from "@/app/(sherrifs)/sherrif-summary-table";
import { Separator } from "@/components/ui/separator";
import { getMagistratesCourts } from "@/lib/fetchers/courts-fetcher";

const SherrifsPage = async () => {

 const {courts, error} = await getMagistratesCourts()

 if(error || courts === null) {
  return <FailedFetch />
 }

  return (
			<div className="">
        <div className="grid grid-cols-1">
          <AddSherrif courts={courts} />
        </div>
        <Separator className="my-4" />
				<SherrifSummaryTable />
			</div>
		);
};
export default SherrifsPage;
