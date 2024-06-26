"use server"

import { court_data } from "@/data/court-data";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {z} from "zod";

export type GeocodingResponse = {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[]
    }[]
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
      location: {
        lat: number;
        lng: number;
      }
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
    }
    place_id: string;
    types: string[]
  }[]
  status: string;
}

const formSchema = z.object({
  district: z.string().trim(),
  office: z.string().trim(),
  province: z.enum(['North West', 'Gauteng', 'Limpopo', 'Mpumalanga', 'KwaZulu-Natal', 'Eastern Cape', 'Western Cape', 'Northern Cape', 'Free State']),
  court_type: z.enum(['Magistrate', 'Branch', 'Detached', 'Periodical']),
  postal_address: z.string().trim(),
  street_address: z.string().trim(),
  tel: z.string().trim(),
  // location: z.string().trim(),
});

export type ActionState = {
  message: string;
  errors: {
    court_type?: string[] | undefined;
    district?: string[] | undefined;
    street_address?: string[] | undefined;
    office?: string[] | undefined;
    postal_address?: string[] | undefined;
    province?: string[] | undefined;
    server?: string | undefined;
    tel?: string[] | undefined;
  } | null;
};


export const createCourt = async (prevState: ActionState, formData: FormData) => {



  const validatedFields = formSchema.safeParse({
    district: formData.get('district'),
    office: formData.get('office'),
    province: formData.get('province'),
    court_type: formData.get('court_type'),
    postal_address: formData.get('postal_address'),
    street_address: formData.get('street_address'),
    tel: formData.get('tel'),
  });

  if (!validatedFields.success) {

    return {
      message: 'Invalid form submission',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }



  const supabase = createClient();

  const encodeAddress = encodeURI(validatedFields.data.street_address as string);

   const gecodingUrl = new URL(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

    const response = await fetch(gecodingUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

      if (!response || response.status === "ZERO_RESULTS" || response.status === "INVALID_REQUEST") {
        return {
          message: 'Could not create court',
          errors: {
            street_address: ['Could not find location for the specified address.'],
          },
        };
    // throw new Error("Could not find location for the specified address.");
  }

  const geocode: GeocodingResponse = await response;



  const { data, error } = await supabase.from('courts').insert([{
    district: validatedFields.data.district,
    office: validatedFields.data.office,
    province: validatedFields.data.province,
    court_type: validatedFields.data.court_type,
    postal_address: validatedFields.data.postal_address,
    street_address: validatedFields.data.street_address,
    tel: validatedFields.data.tel,
    lat: geocode.results[0].geometry.location.lat,
    lng: geocode.results[0].geometry.location.lng,
    location: `POINT( ${geocode.results[0].geometry.location.lng}  ${geocode.results[0].geometry.location.lat})`
  }]).select('*');

    revalidatePath("/dasboard/courts")



  if (error) {
    return { message: 'Could not create court',
    errors: {
      server: error.message,
    }};
  }

  return { message: 'Court created', errors: null };
};


export const updateCourt = async (prevState: ActionState,court_id: string, formData: FormData) => {
  const validatedFields = formSchema.safeParse({
    district: formData.get('district'),
    office: formData.get('office'),
    province: formData.get('province'),
    court_type: formData.get('court_type'),
    postal_address: formData.get('postal_address'),

  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form submission',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const supabase = createClient();

  const { data, error } = await supabase.from('courts').update({
    district: validatedFields.data.district,
    office: validatedFields.data.office,
    province: validatedFields.data.province,
    court_type: validatedFields.data.court_type,
    postal_address: validatedFields.data.postal_address,

  }).eq('id', court_id).select('*').single();



  if (error) {
    return { message: 'Could not update court',
    errors: {
      server: error.message,
    }};
  }

  return { message: 'Court updated', errors: null };
}


export const seedCourts = async () => {

  const supabase = createClient();

const seedData = court_data.map((court) => ({district: court.district,
      office: court.office,
      province: court.province,
      // court_type: "Magistrate",
      postal_address: court.postal_address,
      street_address: court.street_address,
      tel: String(court.tel),
      lat: Number(court.lat),
      lng: Number(court.lng),
      location: `POINT( ${Number(court.lng)}  ${Number(court.lat)})`}))


     const data = await supabase.from('courts').insert(seedData).select('*');

    console.log("Court data added", data)

  return { message: 'Courts created'};

}
