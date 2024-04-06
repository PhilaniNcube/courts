import AddSherrif from "@/app/(sherrifs)/add-sherrif";
import SherrifSummaryTable from "@/app/(sherrifs)/sherrif-summary-table";
import { Separator } from "@/components/ui/separator";
import { getMagistratesCourts } from "@/lib/fetchers/courts-fetcher";

const SherrifsPage = async () => {

 const {courts, error} = await getMagistratesCourts()

 console.log({courts, error})

  return (
			<div className="">
        <div className="grid grid-cols-1">
          {!error || courts === null || courts.length !== 0 && <AddSherrif courts={courts} /> }
        </div>
        <Separator className="my-4" />
				<SherrifSummaryTable />
			</div>
		);
};
export default SherrifsPage;
