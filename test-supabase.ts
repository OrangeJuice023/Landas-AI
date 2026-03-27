import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTable() {
  const { data, error } = await supabase.from('saved_paths').select('*').limit(1);
  if (error) {
    console.error("Error connecting to Supabase or missing table:", error.message);
  } else {
    console.log("Table exists! Data:", data);
  }
}

checkTable();
