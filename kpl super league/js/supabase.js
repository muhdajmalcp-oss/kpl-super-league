const SUPABASE_URL = "https://ldznkyxdzqxsqlpemsju.supabase.co";

const SUPABASE_KEY = "sb_publishable_hyLEcA1WDomkSDTLqgQzpw_jwWlPSzw";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Supabase connected");