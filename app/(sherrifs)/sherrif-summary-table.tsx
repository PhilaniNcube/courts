import { Button } from "@/components/ui/button";
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
import { EyeIcon } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";



const SherrifSummaryTable = async () => {

  const { sherrifs, error } = await getSherrifs(1);



  return (
			<div>
				<Table>
					<TableCaption>Sherrif Summary</TableCaption>
					<TableHeader>
						<TableRow className="text-lg font-medium text-zinc-950">
							<TableHead>First Name</TableHead>
							<TableHead>Last Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Cell Number</TableHead>
							<TableHead>Address</TableHead>
              <TableHead>View</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sherrifs?.map((sherrif) => (
							<TableRow key={sherrif.id} className="py-2">
								<TableCell>{sherrif.first_name}</TableCell>
								<TableCell>{sherrif.last_name}</TableCell>
								<TableCell>{sherrif.email}</TableCell>
								<TableCell>{sherrif.cell_number}</TableCell>
								<TableCell>{sherrif.address}</TableCell>
								<TableCell>
                  <Link href={`/dashboard/sherrifs/${sherrif.id}`}>
                    <Button variant="outline" type="button">
                      <EyeIcon />
                    </Button>
                  </Link>
                </TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
};
export default SherrifSummaryTable;
