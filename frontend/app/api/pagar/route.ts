import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });

export async function POST(req: Request) {
  try {
    // 1. Recibimos los datos del turno
    const { monto, nombre, dia, hora } = await req.json();

    const preference = new Preference(client);

    // 👇 IMPORTANTE: Esta es la dirección de tu web (si estás probando en Vercel)
    // Cuando termines, asegurate de que sea https://webturnosanabelen.vercel.app
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
        back_urls: {
          // 👇 EL SECRETO: Mandamos los datos en la URL de vuelta
          success: `${URL_BASE}/confirmacion?status=approved&dia=${dia}&hora=${hora}&nombre=${encodeURIComponent(nombre)}`,
          failure: URL_BASE,
          pending: URL_BASE,
        },
        auto_return: "approved",
      },
    });

    return Response.json({ url: result.init_point });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Error al crear la preferencia" }, { status: 500 });
  }
}