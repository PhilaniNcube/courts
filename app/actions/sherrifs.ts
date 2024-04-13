"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import {z} from "zod";
import type { GeocodingResponse } from "./courts";

type PrevState = {
  message: string;
  errors?: {
    address?: string[] | undefined;
    cell_number?: string[] | undefined;
    email?: string[] | undefined;
    first_name?: string[] | undefined;
    last_name?: string[] | undefined;
    phone_contact?: string[] | undefined;
    magistrate_court_id?: string[] | undefined;
  }
}

const formSchema = z.object({
  first_name: z.string().trim(),
  last_name: z.string().trim(),
  email: z.string().email(),
  cell_number: z.string().trim(),
  phone_contact: z.string().trim(),
  address: z.string().trim(),
  magistrate_court_id: z.string().trim(),
})

export async function addSherrif( prevState: PrevState, formData:FormData){

  const supabase = createClient();



  const validatedFields = formSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    cell_number: formData.get('cell_number'),
    phone_contact: formData.get('phone_contact'),
    address: formData.get('address'),
    magistrate_court_id: formData.get('magistrate_court_id'),
  })



  if (!validatedFields.success) {

    return {
      message: "Invalid form submission",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }



 const encodeAddress = encodeURI(validatedFields.data.address as string);

   const gecodingUrl = new URL(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
  );

    const response = await fetch(gecodingUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

      if (!response || response.status === "ZERO_RESULTS" || response.status === "INVALID_REQUEST") {

      return {
        message: "Could not find location for the specified address",
        success: false,
      };
    // throw new Error("Could not find location for the specified address.");
  }

  const geocode: GeocodingResponse = await response;

  const {data, error} = await supabase.from('sherrifs').insert([{
    first_name: validatedFields.data.first_name,
    last_name: validatedFields.data.last_name,
    email: validatedFields.data.email,
    cell_number: validatedFields.data.cell_number,
    phone_contact: validatedFields.data.phone_contact,
    address: validatedFields.data.address,
    magistrate_court_id: validatedFields.data.magistrate_court_id,
    lat: geocode.results[0].geometry.location.lat,
    lng: geocode.results[0].geometry.location.lng,
    location: `POINT( ${geocode.results[0].geometry.location.lng}  ${geocode.results[0].geometry.location.lat})`
  }]).select('*').single();


  if (error) {
    return {
      message: "An error occurred while adding the sherrif",
      success: false,
    };
  }

  revalidatePath('/dashboard/sherrifs');

  return {
    message: "Sherrif added successfully",
    success: true,
  };


}


export async function updateSherrif(prevState: PrevState, formData:FormData){

  const supabase = createClient();

  const validatedFields = formSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    cell_number: formData.get('cell_number'),
    phone_contact: formData.get('phone_contact'),
    // address: formData.get('address'),
    magistrate_court_id: formData.get('magistrate_court_id'),
  })

  if (!validatedFields.success) {

    return {
      message: "Invalid form submission",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }



  const {data, error} = await supabase.from('sherrifs').update({
    first_name: validatedFields.data.first_name,
    last_name: validatedFields.data.last_name,
    email: validatedFields.data.email,
    cell_number: validatedFields.data.cell_number,
    phone_contact: validatedFields.data.phone_contact,
    magistrate_court_id: validatedFields.data.magistrate_court_id,
  }).select('*').single();



  if (error) {
    return {
      message: "An error occurred while updating the sherrif",
    };
  }

  revalidatePath('/dashboard/sherrifs');

  return {
    message: "Sherrif added successfully",
  };


}


export async function createAction(formData:FormData) {

  const supabase = createClient();

  const { error, count} = await supabase.from('sherrifs').select('*', {count: 'exact'});

  if (error) {
    return {
      count: 0,
    };
  }

  return {
    count,
  }
}
