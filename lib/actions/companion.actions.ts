"use server"; // this code only runs on server

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";


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
export const getAllCompanions = async ({
    limit = 10,
    page = 1,
    subject,
    topic,
  }: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select(); // Select all columns from the "companions" table

  // Apply filters based on the provided subject and topic
  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1); // Paginate the results

  const { data: companions, error } = await query; // Execute the query and get the data or error
  if (error) throw new Error(error.message || "Failed to fetch companions"); // Handle errors

  return companions; // Return the fetched companions
};

// This function retrieves a specific companion by its ID from the database.
export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient(); // Create a Supabase client instance

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id); // Select the companion with the specified ID

  if (error) return console.log(error);

  return data[0]; // Return the companion data or undefined if not found
};

// This function adds a companion to the session history for the authenticated user.
export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

// This function retrieves the most recent session companions from the session history.
export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};


// 
export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};

// This function retrieves all companions created by a specific user.
export const getUserCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
      .from('companions')
      .select()
      .eq('author', userId)

  if(error) throw new Error(error.message);

  return data;
}

// This function checks if the user has permission to create a new companion based on their plan or feature limits.
export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if(has({ plan: 'pro' })) {
      return true;
  } else if(has({ feature: "3_companion_limit" })) {
      limit = 3;
  } else if(has({ feature: "10_companion_limit" })) {
      limit = 10;
  }

  const { data, error } = await supabase
      .from('companions')
      .select('id', { count: 'exact' })
      .eq('author', userId)

  if(error) throw new Error(error.message);

  const companionCount = data?.length;

  if(companionCount >= limit) {
      return false
  } else {
      return true;
  }
}

// Bookmarks

export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  // Revalidate the path to force a re-render of the page

  revalidatePath(path);
  return data;
};


export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

// It's almost the same as getUserCompanions, but it's for the bookmarked companions
export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  // We don't need the bookmarks data, so we return only the companions
  return data.map(({ companions }) => companions);
};