import { getNearestSherrifs } from "@/lib/fetchers/sherrif-fetchers";
import SherrifCard from "./sherrif-card";

const NearestSherrifs = async ({lat, lng}:{lat:number, lng:number}) => {

  const {sherrifs, error} = await getNearestSherrifs(lat, lng);

  console.log({sherrifs, error})

  if (error || !sherrifs) {
    return <div>{error}</div>;
  }

  return (
			<section className="p-4 mt-6 rounded-md bg-zinc-400">
				<h2 className="text-2xl font-semibold">Nearest Sherrifs</h2>
				<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
					{sherrifs?.map((sherrif) => (
						<SherrifCard key={sherrif.id} sherrif={sherrif} />
					))}
				</div>
			</section>
		);
};
export default NearestSherrifs;
