import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFileToSupabase = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No file provided");
  }

  const fileName = `${uuidv4()}-${file.name}`;

  const { error } = await supabase.storage
    .from("photoss") 
    .upload(fileName, file);

  if (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  const fileUrl = supabase.storage.from("photoss").getPublicUrl(fileName)
    .data.publicUrl;
  console.log(fileUrl, "here is the uploaded file url......utils");

  return fileUrl;
};
