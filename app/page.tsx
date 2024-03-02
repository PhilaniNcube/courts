import SignIn from "@/components/auth-ui/sign-in";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



export default async function Index() {

  const supabase = createClient();

  const {data, error} = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  if(data.user?.id) {

    redirect("/dashboard");
  }


  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-screen gap-20">

      <SignIn />

    </div>
  );
}
