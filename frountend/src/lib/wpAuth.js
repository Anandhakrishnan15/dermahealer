let cachedToken = null;
let tokenExpiry = 0;

export async function getCachedWPToken() {
    // 1. Check Cache: Return cached token if valid
    if (cachedToken && Date.now() < tokenExpiry) {
        console.log("Using cached WP token.");
        return cachedToken;
    }

    const tokenURL = "https://blog.dermahealerindia.com/wp-json/jwt-auth/v1/token";

    // 2. Attempt to fetch a new token
    const res = await fetch(tokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: "dermahealerindia",
            password: "t(qoBoQ!p$L!dmo10(VR0dzR",
        }),
    });

    // 3. CRITICAL: Check the HTTP Status (401, 403, 500 etc.)
    if (!res.ok) {
        // Read the error message, assuming WP returns JSON or text error
        const errorDetail = await res.text();
        // Throw the specific server error for debugging
        throw new Error(`WP Token Fetch Failed (Status ${res.status}): ${errorDetail}`);
    }
    // console.log(res);
    
    // 4. Safely parse the response data
    const data = await res.json();
    

    // 5. CRITICAL: Check if the required 'token' field exists
    if (!data.token) {
        // This catches cases where the status is 200, but the token is missing/falsy
        const responseDetail = data.message || JSON.stringify(data);
        throw new Error(`WP Authentication Failed. Response missing token: ${responseDetail}`);
    }

    // 6. Cache and Return the new token
    cachedToken = data.token;
    // Set the expiry to 10 minutes from now (as you had it)
    tokenExpiry = Date.now() + 1000 * 60 * 10;
    console.log("Successfully fetched and cached new WP token.");

    return cachedToken;
}