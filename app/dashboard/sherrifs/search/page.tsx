import NearestCourts from "@/app/(courts)/nearest-courts";
import { getNearestCourts } from "@/lib/fetchers/courts-fetcher";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";

const SherrifSearch =  ({
	params,
	searchParams,
}: {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}) => {



const address = searchParams?.address as string;



	return <div>
    <Suspense fallback={<div>Loading...</div>}>
     <NearestCourts address={address} />
    </Suspense>
  </div>;
};
export default SherrifSearch;
