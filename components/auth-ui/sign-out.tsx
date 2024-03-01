"use client"
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { signOut } from "@/app/actions/auth";

const SignOut = () => {

  const {pending} = useFormStatus()

  return (
			<form action={signOut}>
				<Button type="submit" variant="destructive">{pending ? "Wait..." : "Sign Out"}</Button>
			</form>
		);
};
export default SignOut;
