import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "../../components/submit-button";
import SignIn from "@/components/auth-ui/sign-in";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {


  return (
    <main className="">
      <SignIn />
    </main>
  );
}
