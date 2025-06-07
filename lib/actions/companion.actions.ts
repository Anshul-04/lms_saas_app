'use server'; // this code only runs on server

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";


// This function is used to create a new companion in the database.
export const createCompanion = async (formData: CreateCompanion) => {
  
  const { userId: author } = await auth(); // Get the authenticated user's ID from Clerk and rename it as author

  const supabase = createSupabaseClient(); // Create a Supabase client instance

  // Validate the form data
  const { data, error } = await supabase
    .from("companions") // Insert a new companion into the "companions" table
    .insert({ ...formData, author }) // add new companion data & the author ID
    .select(); // Select the newly created companion data

  // Handle errors or return the created companion
  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");
  return data[0];
};

// This function retrieves all companions from the database.
export const getAllCompanion = async ({ limit = 10, page = 1 ,subject,topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient(); 

  let query = supabase.from("companions").select() // Select all columns from the "companions" table

  // Apply filters based on the provided subject and topic
  if(subject && topic){
    query = query.ilike('subject', `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }
  else if(subject){
    query = query.ilike('subject', `%${subject}%`)
  }
  else if(topic){
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1) // Paginate the results

  const { data: companions, error } = await query; // Execute the query and get the data or error
  if (error) throw new Error(error.message || "Failed to fetch companions"); // Handle errors

  return companions; // Return the fetched companions

}