import { court_data } from "@/data/court-data";
import { createClient } from "@/utils/supabase/server";

type Court = {
  district: string;
  office: string;
  province: string;
  postal_address: string;
  street_address: string;
  tel: string;
  lat: string;
  lng: string;
  gps: string;
};

export async function POST(request:Request) {
  const supabase = createClient();

  //write a forEach loop to iterate over the court_data array
const seed = court_data.map((court) => {

  const courtData = supabase.from('courts').insert([{
    district: court.district,
    office: court.office,
    province: court.province,
    court_type: "Magistrate",
    postal_address: court.postal_address,
    street_address: court.street_address,
    tel: String(court.tel),
    lat: Number(court.lat),
    lng: Number(court.lng),
    location: `POINT( ${Number(court.lng)}  ${Number(court.lat)})`
  }]).select('*').single();

  console.log("Court data added", courtData)


  return courtData;


});


  return Response.json({ message: 'Courts created'})

}
