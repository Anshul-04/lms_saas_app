'use server';

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";


export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth(); // Correct usage of auth()

  const supabase = createSupabaseClient(); // Create a Supabase client instance

  // Validate the form data
  const { data, error } = await supabase
    .from("Companions")
    .insert({ ...formData, author })
    .select(); // Select the newly created companion

  // Handle errors or return the created companion
  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");
  return data[0];
};
