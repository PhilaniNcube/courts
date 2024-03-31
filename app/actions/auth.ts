"use server"

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, {
		message: "Password must be at least 8 characters long",
	}),
});

export const signIn = async (prevState:{message:string},formData: FormData) => {

  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

   if (!validatedFields.success) {
    return {
      message: "Invalid form submission",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (error) {
    return { message: "Could not authenticate user" };
  }

  redirect("/dashboard");
  // return { message: "Signed in" };
};


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

export const signUp = async (prevState:{message:string},
formData: FormData) => {

  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    full_name: formData.get('full_name'),
    username: formData.get('username'),
  })

   if (!validatedFields.success) {
    return {
      message: "Invalid form submission",
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }



  const origin = headers().get("origin");
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: validatedFields.data.full_name,
        username: validatedFields.data.username,
      }
    },
  });

  if (error) {

    return { message: error.message,
    };
  }



  return { message: "Check email to continue sign in process", };
};


export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();

}
