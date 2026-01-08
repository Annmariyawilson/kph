import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://lnnylmfoefpxxosfpuod.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxubnlsbWZvZWZweHhvc2ZwdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDYzMTUsImV4cCI6MjA4MzM4MjMxNX0.7FWKVlwMvbMjiCcd31KkUU3cMt5ypMgTRGTSvgGFzR0";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function verify() {
    console.log("Verifying Supabase connection...");

    try {
        // Check if we can talk to Supabase at all (e.g. by trying to get a session or list buckets)
        // List buckets
        const { data: buckets, error } = await supabase.storage.listBuckets();

        if (error) {
            console.error("Error listing buckets:", error.message);
            process.exit(1);
        }

        console.log("Buckets found:", buckets ? buckets.map(b => b.name) : "None");

        const uploadsBucket = buckets.find(b => b.name === 'uploads');

        if (uploadsBucket) {
            console.log("SUCCESS: 'uploads' bucket exists.");
        } else {
            console.error("WARNING: 'uploads' bucket NOT found. Please create it in the Supabase Dashboard.");
            console.log("Note: Make sure the bucket is Public for the gallery to work.");
        }

    } catch (err) {
        console.error("Unexpected error:", err.message);
        process.exit(1);
    }
}

verify();
