import type { GeocodingResponse } from '@/app/actions/courts';
import { createClient } from '@/utils/supabase/server';
import {type NextRequest, NextResponse} from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
  email: z.string().email(),
  cell_number: z.string().trim(),
  phone_contact: z.string().trim(),
  address: z.string().trim(),
  magistrate_court_id: z.string().trim(),
})

export async function POST(request: NextRequest) {

  const supabase = createClient();

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const parsed = formSchema.safeParse(data);

    if (!parsed.success) {
        return NextResponse.json({
            message: 'Invalid form submission',
            error: parsed.error.flatten().fieldErrors,
            success: false,
        }, {
            status: 400,
        });
    }

     const encodeAddress = encodeURI(parsed.data.address as string);

   const gecodingUrl = new URL(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

    const response = await fetch(gecodingUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

      if (!response || response.status === "ZERO_RESULTS" || response.status === "INVALID_REQUEST") {

       return NextResponse.json({
            message: response.status === "ZERO_RESULTS" ? "No results found for the specified address" : "Invalid request",
            error: response.status,
            success: false,
        }, {
            status: 400,
        });
    // throw new Error("Could not find location for the specified address.");
  }

  const geocode: GeocodingResponse = await response;

  const {data:sherrif, error} = await supabase.from('sherrifs').insert([{
    first_name: parsed.data.first_name,
    last_name: parsed.data.last_name,
    email: parsed.data.email,
    cell_number: parsed.data.cell_number,
    phone_contact: parsed.data.phone_contact,
    address: parsed.data.address,
    magistrate_court_id: parsed.data.magistrate_court_id,
    lat: geocode.results[0].geometry.location.lat,
    lng: geocode.results[0].geometry.location.lng,
    location: `POINT( ${geocode.results[0].geometry.location.lng}  ${geocode.results[0].geometry.location.lat})`
  }]).select('*').single();

  if(error) {
         return NextResponse.json({
            message: error.message,
            error: error.code,
            success: false,
        }, {
            status: 400,
        });
  }


   return NextResponse.json({
    message: 'Sherrif added successfully',
    data: sherrif,
    success: true,
   }, {
    status: 201,
   })
}
