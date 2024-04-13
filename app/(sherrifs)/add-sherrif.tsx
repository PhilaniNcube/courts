"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AutoCompleteType } from "../(courts)/create-court";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { addSherrif, createAction } from "../actions/sherrifs";
import { SubmitButton } from "@/components/submit-button";
import type { Database } from "@/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";




const formSchema = z.object({
	first_name: z.string().trim(),
	last_name: z.string().trim(),
	email: z.string().email(),
	cell_number: z.string().trim(),
	phone_contact: z.string().trim(),
	magistrate_court_id: z.string().trim(),
});

const initialState = {
  message: "",
  success: false,
}

type AddSherrifProps = {
  courts: Database['public']['Tables']['courts']['Row'][]
}

const AddSherrif = ({courts}:AddSherrifProps) => {



  const { pending } = useFormStatus();

  const [value, setValue] = useState<AutoCompleteType | null>(null);



   const [state, formAction] = useFormState(addSherrif, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })





  const onSubmit = async (values: z.infer<typeof formSchema>) => {



  //  fetch('/api/sherrif', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     ...values,
  //     address: value?.label,
  //   }),
  //  }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.error(err));

  const formData = new FormData();

  formData.append('first_name', values.first_name);
  formData.append('last_name', values.last_name);
  formData.append('email', values.email);
  formData.append('cell_number', values.cell_number);
  formData.append('phone_contact', values.phone_contact);
  formData.append('address', value?.label as string);
  formData.append('magistrate_court_id', values.magistrate_court_id);





  //  fetch('/api/sherrif', {
  //   method: 'POST',
  //   body: formData,
  //  }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.error(err));



   await formAction(formData);

    if(state.success) {
      toast.success(state.message, {
							description: "Sherrif added successfully",
							descriptionClassName: "text-green-600",
              duration: 2000,
							action: {
								label: "Close",
								onClick: () => form.reset(),
							},
						});
      form.reset();
      form.resetField('first_name');
      form.resetField('last_name');
      form.resetField('email');
      form.resetField('cell_number');
      form.resetField('phone_contact');
      setValue(null);
    } else {
      toast.error(state.message);
    }

  };




  return (
			<div className="w-1/2 px-2">
				<Form {...form}>
          <p className="text-md font-medium text-red-600">{state.success === false && state.message}</p>
					<form
						ref={formRef}
						// action={createAction}
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="my-2">
							<Label htmlFor="address">Enter Street Address</Label>

							<GooglePlacesAutocomplete
								apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
								// apiOptions={{
								//   retries: 8,
								// }}
								selectProps={{
									name: "street_address",
									id: "street_address",
									value,
									onChange: setValue,
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
						</div>
						<div className="grid grid-cols-1 gap-6 my-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid grid-cols-1 gap-6 my-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cell_number"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Cell Number</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone_contact"
								render={({ field }) => (
									<FormItem className="">
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<Input placeholder="" {...field} />
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="magistrate_court_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Magistrates Court</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a magistrates court" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{courts.map((court) => (
													<SelectItem value={court.id}>
														{court.office}
													</SelectItem>
												))}
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button aria-disabled={pending} className="w-[300px]">{pending ? "Wait...": "Save"}</Button>
					</form>
				</Form>
			</div>
		);
};
export default AddSherrif;
