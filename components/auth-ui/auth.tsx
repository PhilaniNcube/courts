import { createClient } from "@/utils/supabase/server";
import SignOut from "./sign-out";
import Link from "next/link";
import { Button } from "../ui/button";
import CreateCourt from "@/app/(courts)/create-court";

const Auth = async () => {

  const supabase = createClient();
  const {data: {user}, error} = await supabase.auth.getUser()

  return (
			<div className="flex flex-row items-center space-x-3">
				{user ? (
          <>
          <CreateCourt />
					<SignOut />
          </>
				) : (
					<>
						<Link href="/login" className="">
							<Button type="button" size="sm" variant="outline">Sign In</Button>
						</Link>
						<Link href="/sign-up" className="">
							<Button type="button" size="sm" variant="secondary">
								Sign Up
							</Button>
						</Link>
					</>
				)}
			</div>
		);
};
export default Auth;
