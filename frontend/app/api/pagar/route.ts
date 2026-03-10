import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });

export async function POST(req: Request) {
  try {
    // 1. Recibimos todos los datos, incluidos los del paciente
    const { monto, nombre, dia, hora, datosPaciente } = await req.json();

    const preference = new Preference(client);

    // Cambiá esto por tu URL de producción en Vercel
    const URL_BASE = "https://webturnosanabelen.vercel.app";

    const result = await preference.create({
      body: {
        items: [
          {
            id: "sena-turno",
            title: `Seña Turno: ${nombre} (${dia} ${hora})`,
            quantity: 1,
            unit_price: Number(monto),
            currency_id: "ARS",
          },
        ],
        // 👇 REFERENCIA EXTERNA: Guardamos toda la info del turno aquí. 
        // Mercado Pago nos la devolverá en el Webhook.
        external_reference: JSON.stringify({
          dia,
          hora,
          ...datosPaciente
        }),
        
        // 👇 WEBHOOK: Esta es la clave. Mercado Pago llamará aquí apenas se apruebe el pago.
        notification_url: `${URL_BASE}/api/webhook`,

        back_urls: {
          success: `${URL_BASE}/confirmacion?status=approved`,
          failure: URL_BASE,
          pending: URL_BASE,
        },
        auto_return: "approved",
      },
    });

    return Response.json({ url: result.init_point });
  } catch (error) {
    console.error("Error MP:", error);
    return Response.json({ error: "Error al crear la preferencia" }, { status: 500 });
  }
}