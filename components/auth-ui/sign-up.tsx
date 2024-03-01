"use client";

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
import { SubmitButton } from "../submit-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { signUp } from "@/app/actions/auth";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long",
	}),
	full_name: z.string(),
	username: z.string().min(3, {
		message: "Username must be at least 3 characters long",
	}),
});

const initialState = {
	message: "",
};

const SignUp = () => {

  const [state, formAction] = useFormState(signUp, initialState)


	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			full_name: "",
			// password: "",
		},
	});

  if (state.message === "Check email to continue sign in process") {
     toast("Please check your email address for a link to confirm your account",
     )
		}

  const formRef = useRef<HTMLFormElement>(null);





	return (
		<Form {...form}>
			<form ref={formRef} action={formAction}>
				<div className="w-full gap-10 lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:gap-0 xl:min-h-[800px]">
					<div className="flex items-center justify-center w-full p-6 xl:p-10">
						<div className="mx-auto w-[350px] space-y-6">
							<div className="space-y-2 text-center">
								<h1 className="text-3xl font-bold">Sign Up</h1>
								<p className="text-gray-500 dark:text-gray-400">
									Enter your information to create an account
								</p>
                {state.message && <p className="text-red-500">{state.message}</p>}
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input min={8} type="password" placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input min={3} placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="space-y-2">
								<FormField
									control={form.control}
									name="full_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<SubmitButton className="w-full">Sign Up</SubmitButton>
						</div>
					</div>
					<div className="hidden lg:block">
						<img
							alt="Sign In"
							className="object-cover w-full h-full aspect-square"
							height="600"
							src="./images/justice.webp"
							width="600"
						/>
					</div>
				</div>
			</form>
		</Form>
	);
};
export default SignUp;
