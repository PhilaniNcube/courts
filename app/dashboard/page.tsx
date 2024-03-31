import Script from "next/script";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { ActivityIcon, DollarSignIcon, HomeIcon, UsersIcon } from "lucide-react";
import { getCourtCount, groupedCourts } from "@/lib/fetchers/courts-fetcher";

const page = async () => {

  const {error, count} = await getCourtCount();
  const { error: e, data } = await groupedCourts();

  console.log(e, data?.find((court) => court.court_type === "Magistrate")?.court_count);

  return (
			<div>
				<Script
					type="text/javascript"
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				/>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">
								Total Courts
							</CardTitle>
							<HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{count} courts</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{count} courts
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">
								Magistrates Courts
							</CardTitle>
							<ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{
									data?.find((court) => court.court_type === "Magistrate")
										?.court_count
								}{" "}
								courts
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+201 since last hour
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">
								Branch Courts
							</CardTitle>
							<DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{
									data?.find((court) => court.court_type === "Branch")
										?.court_count
								}
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-sm font-medium">
								Periodical Courts
							</CardTitle>
							<ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{
									data?.find((court) => court.court_type === "Periodical")
										?.court_count
								}
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								+0.3% from last month
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
};
export default page;
