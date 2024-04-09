"use client"

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import type { AutoCompleteType } from "../(courts)/create-court";
import {type FormEvent, useState } from "react";
import {  useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

const SearchByAddress = () => {

  const [value, setValue] = useState<AutoCompleteType | null>(null);

  const router = useRouter();


  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/dashboard/sherrifs/search?address=${value?.label}`);
  };

  return (
			<form onSubmit={handleSubmit} className="flex items-center justify-between w-[550px]">
				<GooglePlacesAutocomplete

					apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
					apiOptions={{
					  retries: 3,
					}}

					selectProps={{
						name: "street_address",
						id: "street_address",
						value,
						onChange: setValue,
            className: "w-[400px]",
					}}
					debounce={1000}
					onLoadFailed={(error) =>
						console.error("Could not load Google Maps", error)
					}

					autocompletionRequest={{
						types: ["geocode"],
						componentRestrictions: {
							country: "za",
						},
					}}
				/>
        <Button className="" type="submit"><SearchIcon /> Search</Button>
			</form>
		);
};
export default SearchByAddress;
