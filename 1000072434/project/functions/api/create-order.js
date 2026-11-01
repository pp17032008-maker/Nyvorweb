export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const orderData = await request.json();

    // 1. Authenticate with Qikink Live API using Cloudflare Env Variables
    const authRes = await fetch("https://dashboard.qikink.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: env.QIKINK_CLIENT_ID,
        client_secret: env.QIKINK_CLIENT_SECRET,
      }),
    });

    const authData = await authRes.json();
    if (!authData.access_token) {
      return new Response(
        JSON.stringify({ error: "Qikink Auth Failed", details: authData }), 
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Format payload for Qikink
    const qikinkPayload = {
      order_number: orderData.order_number,
      payment_type: orderData.payment_method || "Prepaid",
      first_name: orderData.customer_name,
      address_line1: orderData.shipping_address,
      city: orderData.city,
      state: orderData.state,
      zipcode: orderData.pincode,
      phone: orderData.phone,
      order_items: orderData.items.map((item) => ({
        sku: item.qikink_sku || "UOsMRnHs-Wh-M",
        quantity: item.quantity || 1,
      })),
    };

    // 3. Send order directly to Qikink
    const orderRes = await fetch("https://dashboard.qikink.com/api/order/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(qikinkPayload),
    });

    const qikinkResult = await orderRes.json();

    return new Response(
      JSON.stringify({ success: true, qikink: qikinkResult }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
