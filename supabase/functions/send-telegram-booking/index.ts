import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN") ?? "";
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID") ?? "";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const {
      accommodation_id,
      accommodation_name,
      first_name,
      last_name,
      phone,
      guests,
      nights,
      notes,
      price_per_night,
    } = await req.json();

    if (
      !accommodation_name || !first_name || !last_name ||
      !phone || !guests || !nights || !price_per_night
    ) {
      return new Response(
        JSON.stringify({ error: "Barcha majburiy maydonlar to'ldirilishi kerak" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: booking, error: dbError } = await supabase
      .from("bookings")
      .insert({
        accommodation_id,
        accommodation_name,
        first_name,
        last_name,
        phone,
        guests: Number(guests),
        nights: Number(nights),
        notes: notes ?? null,
        price_per_night,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      return new Response(
        JSON.stringify({ error: "Ma'lumotlarni saqlashda xatolik yuz berdi" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const message =
      `🔔 *YANGI BRON SO'ROVI*\n\n` +
      `🏠 *Obyekt:* ${accommodation_name}\n` +
      `👤 *Ism:* ${first_name} ${last_name}\n` +
      `📞 *Telefon:* ${phone}\n` +
      `👥 *Mehmonlar soni:* ${guests} kishi\n` +
      `📅 *Dam olish muddati:* ${nights} kun\n` +
      `💰 *Kunlik narx:* ${price_per_night}\n` +
      `💰 *Umumiy narx:* ${formatPrice(price_per_night, Number(nights))}\n` +
      (notes ? `📝 *Izoh:* ${notes}\n` : "") +
      `\n⏳ *Status:* Administrator tekshirmoqda\n` +
      `🕐 *Yuborilgan vaqt:* ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const tgResponse = await fetch(
          `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: TELEGRAM_CHAT_ID,
              text: message,
              parse_mode: "Markdown",
            }),
          },
        );

        if (!tgResponse.ok) {
          const tgError = await tgResponse.text();
          console.error("Telegram API error:", tgError);
        }
      } catch (tgErr) {
        console.error("Telegram send error:", tgErr);
      }
    } else {
      console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured");
    }

    return new Response(
      JSON.stringify({
        success: true,
        booking,
        message: "Bron so'rovingiz yuborildi. Administrator bo'sh kunlarni tekshiradi va sizga xabar beradi.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message ?? "Server xatoligi" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

function formatPrice(pricePerNight: string, nights: number): string {
  const digits = pricePerNight.replace(/\D/g, "");
  const num = parseInt(digits, 10);
  if (isNaN(num)) return pricePerNight;
  const total = num * nights;
  return total.toLocaleString("ru-RU") + " so'm";
}
