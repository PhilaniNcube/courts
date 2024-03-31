import AddSherrif from "@/app/(sherrifs)/add-sherrif";
import SherrifSummaryTable from "@/app/(sherrifs)/sherrif-summary-table";
import { Separator } from "@/components/ui/separator";

const SherrifsPage = () => {
  return (
			<div className="">
				<AddSherrif />
        <Separator className="my-4" />
				<SherrifSummaryTable />
			</div>
		);
};
export default SherrifsPage;
