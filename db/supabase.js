const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = "https://hjipviyruaqegflufrht.supabase.co";
const supabaseKey1 = process.env.SUPABASE_KEY_1;
const supabaseKey2 = process.env.SUPABASE_KEY_2;
const supabaseKey = supabaseKey1 + supabaseKey2;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
