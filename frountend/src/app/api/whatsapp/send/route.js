export async function POST(req) {
    try {
        const body = await req.json();

        let { to, template, params } = body;

        if (!to || !template) {
            return Response.json(
                { success: false, message: "Missing fields" },
                { status: 400 }
            );
        }

        // ✅ Always treat as array
        const numbers = Array.isArray(to) ? to : [to];

        const formattedParams = Array.isArray(params)
            ? params.map((p) => ({ type: "text", text: String(p) }))
            : [];

        let successList = [];
        let failedList = [];

        for (const num of numbers) {
            let phone = String(num || "").replace(/\D/g, "");

            if (!phone) {
                failedList.push({ phone: num, error: "Invalid number" });
                continue;
            }

            if (!phone.startsWith("91")) {
                phone = "91" + phone;
            }

            try {
                const response = await fetch(
                    `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            messaging_product: "whatsapp",
                            to: phone,
                            type: "template",
                            template: {
                                name: template,
                                language: { code: "en_US" },
                                components: [
                                    {
                                        type: "body",
                                        parameters: formattedParams,
                                    },
                                ],
                            },
                        }),
                    }
                );

                const data = await response.json();

                // 🔍 Log each response
                if (!response.ok || data.error) {
                    failedList.push({
                        phone,
                        error: data?.error?.message || "WhatsApp failed",
                    });
                } else {
                    successList.push({
                        phone,
                        id: data.messages?.[0]?.id,
                    });
                }

            } catch (err) {
                // ❌ Skip error, continue next
                failedList.push({
                    phone,
                    error: err.message,
                });
            }

            // ⏳ Delay (VERY IMPORTANT to avoid blocks)
            await new Promise((res) => setTimeout(res, 500));
        }

        return Response.json({
            success: true,
            total: numbers.length,
            sent: successList.length,
            failed: failedList.length,
            successList,
            failedList,
        });

    } catch (error) {
        console.error("Server Error:", error);

        return Response.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}