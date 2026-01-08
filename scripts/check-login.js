import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verifyLogin() {
    console.log("Verifying login for admin@gmail.com...");
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@gmail.com',
        password: 'admin@123',
    });

    if (error) {
        console.error("LOGIN FAILED:", error.message);
        if (error.message.includes("Email not confirmed")) {
            console.log("-> The SQL query to confirm the email hasn't been run or didn't work.");
        } else if (error.message.includes("Invalid login credentials")) {
            console.log("-> The user still doesn't exist or password doesn't match.");
        }
    } else {
        console.log("LOGIN SUCCESS! User ID:", data.user.id);
        console.log("Status: READY");
    }
}

verifyLogin();
