import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string,
});

export async function POST(req: Request) {
  console.log(">>> INICIANDO PREFERENCIA (VERSIÓN FINAL) <<<");

  try {
    const body = await req.json();
    const precio = Number(body.monto);

    if (!precio || precio <= 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }

    const preference = new Preference(client);

    const preferenceData = {
      body: {
        items: [
          {
            id: "turno-medico", // <--- ESTO ES LO QUE TE PEDÍA (el ID)
            title: "Consulta médica – Seña",
            quantity: 1,
            unit_price: precio,
            currency_id: "ARS",
          }
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/success`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/failure`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pending`,
        },
        // auto_return: "approved", // Desactivado para evitar errores en localhost
      },
    };

    console.log(">>> ENVIANDO A MP...", JSON.stringify(preferenceData, null, 2));

    // 👇 IMPORTANTE: 'as any' silencia los errores estrictos de TypeScript
    const response = await preference.create(preferenceData as any);

    console.log(">>> ✅ PAGO CREADO:", response.init_point);
    return NextResponse.json({ url: response.init_point });
    
  } catch (error: any) {
    console.error(">>> ❌ ERROR MP:", error);
    return NextResponse.json(
      { error: "Error al crear pago", details: error.message },
      { status: 500 }
    );
  }
}