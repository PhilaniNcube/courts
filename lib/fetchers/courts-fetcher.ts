import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCourts() {
  const supabase = createClient();

  try {
    const { data, error, count } = await supabase.from("courts").select("*", { count: "exact" });
    if (error) {
      return {
        error: error.message,
        courts: null,

      };
    }


    return {
    error: null,
    courts: data,
  }

  } catch (err) {

    return {
      error: err,
      courts: null,

    }
  }


   }



export async function getCourtCount() {
  const supabase = createClient();

  try {
    const { error, count } = await supabase.from("courts").select("*", { count: "exact" });

    if (error) {
      return {
        error: error.message,
        count: 0,
      };
    }

    return {
    error: null,
    count: count,
  }

  } catch (err) {

    return {
      error: err,
      count: 0,
    }
  }
}


export async function getMagistratesCount() {
  const supabase = createClient();

  try {
    const { error, count } = await supabase.from("courts").select("*", { count: "exact" }).eq("court_type", "Magistrate");

    if (error) {
      return {
        error: error.message,
        count: 0,
      };
    }

    return {
    error: null,
    count: count,
  }

  } catch (err) {

    return {
      error: err,
      count: 0,
    }
  }
}


export async function groupedCourts() {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('court_types_view').select('*');

    if (error) {
      return {
        error: error.message,
        data: null,
      };
    }

    return {
    error: null,
    data: data,
  }

  } catch (err) {

    return {
      error: err,
      data: null,
    }
  }
}
