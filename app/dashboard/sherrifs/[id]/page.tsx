import UpdateSherrif from "@/app/(sherrifs)/update-sherrif";
import { Button } from "@/components/ui/button";
import {  getMagistratesCourts } from "@/lib/fetchers/courts-fetcher";
import { getSherrif } from "@/lib/fetchers/sherrif-fetchers";
import { CloudOffIcon } from "lucide-react";
import Link from "next/link";

const page = async ({params: {id}}:{params:{id:string}}) => {

  const {sherrif, error} = await getSherrif(id);
  const {courts, error: courtError} = await getMagistratesCourts();

  console.log({sherrif, error, courts, courtError})

  if(error || sherrif === null || courtError || courts === null) {
    return  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-md shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <CloudOffIcon className="w-12 h-12 mx-auto text-gray-900 dark:text-gray-100" />
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Oops! Fetch Failed</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We're sorry, but we couldn't retrieve the data. Please check your internet connection and try again.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/dashboard/sherrifs">
          <Button className="w-full" variant="outline">
            Back To Sherris Page
          </Button>
          </Link>
        </div>
      </div>
    </div>;
  }

  return <UpdateSherrif courts={courts} sherrif={sherrif} />;
};
export default page;
