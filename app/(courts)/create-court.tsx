"use client"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { createCourt } from "../actions/courts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { useRef, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


type AutoCompleteType = {
	label: string;
	value: {
		matched_substrings: {
			length: number;
			offset: number;
		}[];
		description: string;
		place_id: string;
		reference: string;
		structured_formatting: {
			main_text: string;
			secondary_text: string;
			main_text_substring: {
				offset: number;
				length: number;
			}[];
		};
		terms: {
			offset: number;
			value: string;
		}[];
		types: string[];
	};
};

const formSchema = z.object({
	district: z.string().trim(),
	office: z.string().trim(),
	province: z.enum([
		"North West",
		"Gauteng",
		"Limpopo",
		"Mpumalanga",
		"KwaZulu-Natal",
		"Eastern Cape",
		"Western Cape",
		"Northern Cape",
		"Free State",
	]),
	court_type: z.enum(["Magistrate", "Branch", "Detached", "Periodical"]),
	postal_address: z.string().trim(),
  tel: z.string().trim(),
});

const initialState = {
  message: "",
  errors: {
    court_type: [],
    district: [],
    street_address: [],
    office: [],
    postal_address: [],
    province: [],
    server: "",
  },
}


const CreateCourt = () => {

  const [state, formAction] = useFormState(createCourt, initialState);

  const [value, setValue] = useState<AutoCompleteType | null>(null);
  const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
					resolver: zodResolver(formSchema),
					defaultValues: {
						court_type: "Magistrate",
            district: "",
            province: "Gauteng",
					},
				});

        const formRef = useRef<HTMLFormElement>(null);



        const onSubmit = async (values:z.infer<typeof formSchema>) => {


          const formData = new FormData();
          formData.append('district', values.district);
          formData.append('office', values.office);
          formData.append('province', values.province);
          formData.append('court_type', values.court_type);
          formData.append('postal_address', values.postal_address);
          formData.append('street_address', value?.label || '');
          formData.append('tel', values.tel);



          await formAction(formData);

          toast(state.message,
            {
              action: {
                label: "Close",
                onClick: () => {
                  setIsOpen(false);
                  toast.dismiss();
                }
              }
            }
            );


        }


  return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button type="button">
						<Plus size={24} />
						Create Court
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Court</DialogTitle>
						<DialogDescription>
							Fill in the form to create a new court
						</DialogDescription>
					</DialogHeader>
					<div className="w-full">
						<Form {...form}>
							<form
              // action={formAction}
              onSubmit={form.handleSubmit(onSubmit)}
              >
								<div className="my-2">
									<Label htmlFor="address">Enter Street Address</Label>
									<GooglePlacesAutocomplete
										apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
										selectProps={{
											value,
											onChange: setValue,
										}}
                    onLoadFailed={(error) => console.error("Could not load Google Maps", error)}
                    autocompletionRequest={{
                      types: ['geocode'],
                      componentRestrictions: {
                        country: 'za'
                      }
                    }}
									/>
								</div>


								<FormField
									control={form.control}
									name="district"
									render={({ field }) => (
										<FormItem className="mb-4">
											<FormLabel>District</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="office"
									render={({ field }) => (
										<FormItem className="mb-4">
											<FormLabel>Office</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="tel"
									render={({ field }) => (
										<FormItem className="mb-4">
											<FormLabel>Telephone Number</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="postal_address"
									render={({ field }) => (
										<FormItem className="mb-4">
											<FormLabel>Postal Address</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="mb-4">
									<FormField
										control={form.control}
										name="province"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Province</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl className="mb-4">
														<SelectTrigger>
															<SelectValue placeholder="Select a province" />
														</SelectTrigger>
													</FormControl>
													<SelectContent className="mb-4">
														<SelectItem value="Eastern Cape">
															Eastern Cape
														</SelectItem>
														<SelectItem value="Free State">
															Free State
														</SelectItem>
														<SelectItem value="Gauteng">Gauteng</SelectItem>
														<SelectItem value="KwaZulu-Natal">
															KwaZulu-Natal
														</SelectItem>
														<SelectItem value="Limpopo">Limpopo</SelectItem>
														<SelectItem value="Mpumalanga">
															Mpumalanga
														</SelectItem>
														<SelectItem value="North West">
															North West
														</SelectItem>
														<SelectItem value="Northern Cape">
															Northern Cape
														</SelectItem>
														<SelectItem value="Western Cape">
															Western Cape
														</SelectItem>
													</SelectContent>
												</Select>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name="court_type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Court Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl className="mb-4">
													<SelectTrigger>
														<SelectValue placeholder="Court Type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Magistrate">Magistrate</SelectItem>
													<SelectItem value="Branch">Branch</SelectItem>
													<SelectItem value="Detached">Detached</SelectItem>
													<SelectItem value="Periodical">Periodical</SelectItem>
												</SelectContent>
											</Select>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="w-full my-4">
									<SubmitButton className="w-full">Save</SubmitButton>
								</div>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		);
};
export default CreateCourt;
