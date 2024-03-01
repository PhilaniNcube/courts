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
import { signIn } from "@/app/actions/auth";
import Link from "next/link";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long",
	}),
});

const initialState = {
	message: "",
};

const SignIn = () => {

  const [state, formAction] = useFormState(signIn, initialState);

  	const form = useForm<z.infer<typeof formSchema>>({
			resolver: zodResolver(formSchema),
		});



	return (
		<div className="h-[calc(100vh-100px)] flex items-center justify-center">
			<div className="max-w-5xl mx-auto">
				<h1 className="mb-2 text-2xl font-bold text-center">Sign In</h1>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-600">
            Sign Up
          </Link>
        </p>
				<Form {...form}>
					<form className="w-full">
						<div>
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
							<div className="mt-5 mb-4 space-y-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													min={8}
													type="password"
													placeholder=""
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<SubmitButton className="w-full">Sign In</SubmitButton>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};
export default SignIn;
