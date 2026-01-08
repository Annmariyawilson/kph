import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createAdmin() {
    console.log("Attempting to create/verify admin user...");

    const email = "admin@gmail.com";
    const password = "admin@123";

    // Try to sign up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log("Sign up result:", error.message);
        if (error.message.includes("already registered")) {
            console.log("User already exists. You can log in.");
        } else {
            console.error("Failed to create user. You may need to create it manually in Supabase Dashboard if public signups are disabled.");
        }
    } else {
        console.log("User created successfully or verification email sent.");
        console.log("Data:", data);
    }
}

createAdmin();
