import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugAuth() {
    console.log("--- Debugging Supabase Auth ---");
    const email = "admin@gmail.com";
    const password = "admin@123";

    console.log(`Attempting login for: ${email}`);

    // 1. Try Login
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (loginError) {
        console.error("LOGIN FAILED:", loginError.message);

        // 2. If login fails, try SignUp to see if user exists or if signups are allowed
        console.log("\nAttempting dry-run signup to diagnose...");
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signupError) {
            console.error("SIGNUP FAILED:", signupError.message);
            if (signupError.message.includes("disabled")) {
                console.log("\n>>> DIAGNOSIS: Public signups are disabled. You MUST create the user manually in Supabase Dashboard.");
            }
        } else {
            console.log("SIGNUP SUCCESS (or verification sent):", signupData);
            console.log("\n>>> DIAGNOSIS: User did not exist previously. We just created it (or tried to).");
            console.log("If 'identities' is empty array, it might mean user already exists but password was wrong?");
        }
    } else {
        console.log("LOGIN SUCCESS!", loginData.user.id);
    }
}

debugAuth();
