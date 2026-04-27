import PaytmChecksum from "paytmchecksum";
import https from "https";

export async function POST(req) {
    try {
        const { orderId, amount } = await req.json();
        const mid = process.env.PAYTM_MID;
        const merchantKey = process.env.PAYTM_MERCHANT_KEY;

        if (!mid || !merchantKey) {
            // console.error("❌ Missing Paytm credentials!");
            return Response.json({ error: "Missing Paytm credentials" }, { status: 400 });
        }
        // Build request body
        const paytmParams = {
            body: {
                requestType: "Payment",
                mid,
                websiteName: "DEFAULT",
                orderId,
                // callbackUrl: `https://secure.paytmpayments.com/theia/paytmCallback?ORDER_ID=${orderId}`,
                callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paytm/callback`,
                txnAmount: {
                    value: amount.toFixed(2),
                    currency: "INR",
                },
                userInfo: {
                    custId: "CUST001",
                },
            },
        };

        // console.log("📦 Paytm Request Body:", JSON.stringify(paytmParams.body, null, 2));

        // Generate checksum
        const checksum = await PaytmChecksum.generateSignature(
            JSON.stringify(paytmParams.body),
            merchantKey
        );

        // console.log("✅ Checksum Generated:", checksum);

        paytmParams.head = { signature: checksum };

        const post_data = JSON.stringify(paytmParams);

        // console.log("📤 Final Payload to Paytm:", post_data);

        // Await HTTPS request properly
        const paytmResponse = await new Promise((resolve, reject) => {
            const options = {
                hostname: "secure.paytmpayments.com",
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": post_data.length,
                },
            };

            // console.log("🌍 HTTPS Request Options:", options);

            const req = https.request(options, (res) => {
                let data = "";
                // console.log("🟡 Sending request to Paytm...");
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                    // console.log("✅ Raw Response from Paytm:", data);
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        // console.error("⚠️ Failed to parse Paytm response:", err);
                        reject(err);
                    }
                });
            });

            req.on("error", (err) => {
                // console.error("❌ HTTPS Request Error:", err);
                reject(err);
            });

            req.write(post_data);
            req.end();
        });

        // console.log("💬 Parsed Paytm Response:", JSON.stringify(paytmResponse, null, 2));

        // Validate response
        const result = paytmResponse.body?.resultInfo;

        // console.log("📊 Paytm Result Info:", result);

        if (result?.resultStatus !== "S") {
            console.error("❌ Paytm initiate failed:", result);
            return Response.json(
                { error: result?.resultMsg || "Paytm system error", raw: paytmResponse },
                { status: 400 }
            );
        }

        // console.log("✅ Paytm Transaction Token:", paytmResponse.body.txnToken);

        // Success response
        return Response.json({
            txnToken: paytmResponse.body.txnToken,
            orderId,
            mid,
            amount,
        });
    } catch (err) {
        // console.error("🔥 Paytm initiate error:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}
