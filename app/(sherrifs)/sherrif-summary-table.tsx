import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { getSherrifs } from "@/lib/fetchers/sherrif-fetchers";
import { unstable_cache } from "next/cache";

const getCachedSherrifs = unstable_cache(
  async () => await getSherrifs(1),
  ["sherrifs"]
)

const SherrifSummaryTable = async () => {

  const { sherrifs, error } = await getCachedSherrifs();



  return (
			<div>
				<Table>
					<TableCaption>Sherrif Summary</TableCaption>
					<TableHeader>
						<TableRow className="text-lg font-medium text-zinc-800">
							<TableHead>First Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Cell Number</TableHead>
							<TableHead>Address</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sherrifs?.map((sherrif) => (
							<TableRow key={sherrif.id}>
								<TableCell>{sherrif.first_name}</TableCell>
								<TableCell>{sherrif.last_name}</TableCell>
								<TableCell>{sherrif.email}</TableCell>
								<TableCell>{sherrif.cell_number}</TableCell>
								<TableCell>{sherrif.address}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
};
export default SherrifSummaryTable;
