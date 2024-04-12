import { createClient } from "@/utils/supabase/server";

export async function isLoggedIn() {
  const supabase = createClient();
  const userData = supabase.auth.getUser();
  const {data, error} =  await userData;

  if(error || data.user === null) {
    return false;
  }

 console.log(data)

  return true;

}
