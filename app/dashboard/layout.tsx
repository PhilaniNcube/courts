import Auth from "@/components/auth-ui/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { createClient } from "@/utils/supabase/server";
import { SearchCheck, XIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import SearchByAddress from "../(sherrifs)/search-by-address";

const DashboardLayout =  ({children}:{children:ReactNode}) => {


  return (
			<main className="flex h-screen">
				<aside className="flex flex-col w-64 h-full bg-gray-800">
					<div className="px-3 py-2 border-b border-white">
						<Link
							href="/dashboard"
							className="text-lg font-semibold text-white"
						>
							Sherrifs
						</Link>
					</div>
					<div className="py-10">
						<nav className="flex flex-col py-2 space-y-2">
							<Link
								href="/dashboard/courts"
								className="flex flex-row px-4 py-2 space-x-2 text-white hover:bg-slate-700"
							>
								Courts
							</Link>
							<Link
								href="/dashboard/sherrifs"
								className="flex flex-row px-4 py-2 space-x-2 text-white hover:bg-slate-700"
							>
								Sherrifs
							</Link>
							<Link
								href="/dashboard/requests"
								className="flex flex-row px-4 py-2 space-x-2 text-white hover:bg-slate-700"
							>
								Requests
							</Link>
						</nav>
					</div>
				</aside>
				<div className="flex-1 h-screen">
					<div className="flex flex-row justify-between w-full px-6 py-4 border-b">
						<SearchByAddress />
						<Auth />
					</div>
					<ScrollArea className="w-full h-[calc(100vh-75px)] px-10 py-4">
						{children}
						<ScrollBar />
					</ScrollArea>
				</div>
			</main>
		);
};
export default DashboardLayout;
