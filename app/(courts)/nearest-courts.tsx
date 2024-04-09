import { getNearestCourts } from "@/lib/fetchers/courts-fetcher";

const NearestCourts = async ({address}:{address:string}) => {

  const {error, data} = await getNearestCourts(address);

  if (error) {
    return <div>{error}</div>
  }



		return (
			<div>
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</div>
		);
};
export default NearestCourts;
