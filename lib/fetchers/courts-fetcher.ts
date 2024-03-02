import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCourts() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("courts").select("*");
    if (error) {
      return {
        error: error.message,
        courts: data
      };
    }

    return {
    error: null,
    courts: data
  }

  } catch (err) {

    return {
      error: err,
      courts: null
    }
  }


   }



