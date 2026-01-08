import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function createFinalAdmin() {
    const email = "admin@paintpalace.com"; // Changed domain just to be safe
    const password = "admin@123";

    console.log(`Creating user: ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("FAILED:", error.message);
    } else {
        console.log("SUCCESS!");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        // Check confirmation status
        if (data.user && !data.session) {
            console.log("NOTE: This user needs email confirmation usually, but for local dev with 'Enable Email Confirmations' OFF, it might work immediately.");
            console.log("Status:", data.user.role);
        }
    }
}

createFinalAdmin();
