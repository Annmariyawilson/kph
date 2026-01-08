import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugAuth() {
    const randomId = Math.floor(Math.random() * 10000);
    const email = `admin${randomId}@gmail.com`;
    const password = "admin@123";

    console.log(`\nAttempting to create NEW random user: ${email}`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("SIGNUP FAILED:", error.message);
        if (error.message.includes("Signups not allowed") || error.message.includes("disabled")) {
            console.log("CONCLUSION: Public signups are strictly DISABLED.");
        }
    } else {
        console.log("SIGNUP SUCCESS:", data);
        console.log(`\n>>> SUCCESS! Created user: ${email} / ${password}`);
        console.log("You can now login with these credentials.");

        // Check if auto-confirmed
        if (data.user && data.user.identities && data.user.identities.length > 0) {
            console.log("User is confirmed.");
        } else if (data.user && !data.session) {
            console.log("WARNING: User created but Email Confirmation is required.");
        }
    }
}

debugAuth();
