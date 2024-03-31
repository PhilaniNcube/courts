import { createClient } from "@/utils/supabase/server";

export async function getSherrifs(page=1, limit=10) {
  const supabase = createClient();

  const start = (page - 1) * limit;
  const end = page * limit;

  try {
    const { data, error, count } = await supabase.from("sherrifs").select("*", { count: "exact" }).range(start, end);
    if (error) {
      return {
        error: error.message,
        sherrifs: null,
      };
    }

    return {
      error: null,
      sherrifs: data,
    };
  } catch (err) {
    return {
      error: err,
      sherrifs: null,
    };
  }
}
