import type { GeocodingResponse } from "@/app/actions/courts";
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

export async function getMagistratesCourts() {
  const supabase = createClient();

  try {
    const { error, data } = await supabase.from("courts").select("*").eq("court_type", "Magistrate");

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


export async function getNearestCourts(address:string) {
  const supabase = createClient();

   const encodeAddress = encodeURI(address);

   const gecodingUrl = new URL(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

    const response = await fetch(gecodingUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

      if (!response || response.status === "ZERO_RESULTS" || response.status === "INVALID_REQUEST") {

      return {
        error: "Could not find location for the specified address",
        data: null,
      };
    // throw new Error("Could not find location for the specified address.");
  }

  const geocode: GeocodingResponse = await response;

  try {



    const { data, error } = await supabase.rpc('nearest_courts', {
      lat: geocode.results[0].geometry.location.lat,
      long: geocode.results[0].geometry.location.lng,
    })

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
      error: "Could not find nearest courts",
      data: null,
    }
  }
}


export async function getCourt(id:string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("courts").select("*").eq("id", id).single();

    if (error) {
      return {
        error: error.message,
        court: null,
      };
    }

    return {
    error: null,
    court: data,
  }

  } catch (err) {

    return {
      error: "Could not find court",
      court: null,
    }
  }
}
