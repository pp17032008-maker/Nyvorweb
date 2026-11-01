import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const QIKINK_AUTH_URL = "https://api.qikink.com/api/v1/token";
const QIKINK_ORDER_URL = "https://api.qikink.com/api/v1/order/create";

serve(async (req) => {
  try {
    const payload = await req.json();
    const order = payload.record; // Retrieves newly inserted row from 'orders' table

    // Only process paid or COD orders
    if (order.payment_status !== 'paid' && order.payment_mode !== 'cod') {
      return new Response(
        JSON.stringify({ message: "Order payment pending, skipped auto-push." }), 
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch live Qikink credentials from Vault
    const clientId = Deno.env.get("QIKINK_CLIENT_ID");
    const clientSecret = Deno.env.get("QIKINK_CLIENT_SECRET");

    if (!clientId || !clientSecret) {
      throw new Error("Missing Qikink API secrets in Vault configuration.");
    }

    // Step A: Fetch Access Token from Qikink API
    const authRes = await fetch(QIKINK_AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const authData = await authRes.json();
    const accessToken = authData.access_token || authData.token;

    if (!accessToken) {
      throw new Error(`Qikink Auth Failed: ${JSON.stringify(authData)}`);
    }

    // Step B: Build Qikink Order Payload
    const qikinkOrderPayload = {
      order_number: order.order_number || order.order_id,
      payment_type: order.payment_mode === 'cod' ? 'COD' : 'Prepaid',
      first_name: order.customer_name,
      address1: order.address,
      city: order.city,
      state: order.state,
      zip: order.pincode,
      email: order.email,
      phone: order.phone,
      order_items: order.items.map((item: any) => ({
        search_by: "sku",
        sku: item.sku || item.id,
        quantity: item.quantity,
      })),
    };

    // Step C: Send Order to Qikink Fulfillment API
    const orderRes = await fetch(QIKINK_ORDER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(qikinkOrderPayload),
    });

    const orderData = await orderRes.json();

    // Step D: Write back Qikink reference ID to Supabase
    if (orderData.status === "success" || orderData.qikink_order_id) {
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      const supabaseAdmin = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      await supabaseAdmin
        .from("orders")
        .update({ qikink_order_id: orderData.qikink_order_id || String(orderData.id) })
        .eq("order_id", order.order_id);
    }

    return new Response(
      JSON.stringify({ success: true, qikinkResponse: orderData }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Qikink Push Error:", err.message);
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
