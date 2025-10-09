let cachedToken = null;
let tokenExpiry = 0;

export async function getCachedWPToken() {
    // 1. Return cached token if valid
    if (cachedToken && Date.now() < tokenExpiry) {
        console.log("✅ Using cached WP token.");
        return cachedToken;
    }

    const tokenURL = "https://blog.dermahealerindia.com/wp-json/jwt-auth/v1/token";

    // 2. Read credentials from environment variables
    const username = process.env.WP_USER;
    const password = process.env.WP_PASS;

    if (!username || !password) {
        throw new Error("❌ Missing WordPress credentials in environment variables.");
    }

    // 3. Request new token
    const res = await fetch(tokenURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
        const errorDetail = await res.text();
        throw new Error(`WP Token Fetch Failed (Status ${res.status}): ${errorDetail}`);
    }

    const data = await res.json();

    if (!data.token) {
        const responseDetail = data.message || JSON.stringify(data);
        throw new Error(`WP Authentication Failed — Missing token: ${responseDetail}`);
    }

    // 4. Cache and return the new token
    cachedToken = data.token;
    tokenExpiry = Date.now() + 1000 * 60 * 10; // 10 min
    console.log("🔑 Successfully fetched and cached new WP token.");

    return cachedToken;
}
