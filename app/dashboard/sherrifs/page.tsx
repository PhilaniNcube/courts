import AddSherrif from "@/app/(sherrifs)/add-sherrif";
import SherrifSummaryTable from "@/app/(sherrifs)/sherrif-summary-table";
import { Separator } from "@/components/ui/separator";

const SherrifsPage = () => {
  return (
			<div className="">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<AddSherrif />
        </div>
        <Separator className="my-4" />
				<SherrifSummaryTable />
			</div>
		);
};
export default SherrifsPage;
