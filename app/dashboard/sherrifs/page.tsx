import FailedFetch from "@/app/(error)/failed-fetch";
import AddSherrif from "@/app/(sherrifs)/add-sherrif";
import SherrifSummaryTable from "@/app/(sherrifs)/sherrif-summary-table";
import NotLoggedIn from "@/components/auth-ui/not-logged-in";
import { Separator } from "@/components/ui/separator";
import { getMagistratesCourts } from "@/lib/fetchers/courts-fetcher";
import { isLoggedIn } from "@/lib/fetchers/users";

const SherrifsPage = async () => {

 // check if user is logged in
 const loggedIn = await isLoggedIn()

 if(!loggedIn) {
  return <NotLoggedIn />;
 }

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
