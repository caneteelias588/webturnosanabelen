import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });

export async function POST(req: Request) {
  try {
    // 👇 Recibimos también el "nombre" del cuerpo de la petición
    const { monto, nombre, dia, hora } = await req.json();

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: "sena-turno",
            // 👇 ESTO ES CLAVE: Ahora el título incluye el nombre
            title: `Seña Turno: ${nombre} (${dia} ${hora})`,
            quantity: 1,
            unit_price: Number(monto),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://webturnosanabelen.vercel.app", 
          failure: "https://webturnosanabelen.vercel.app",
          pending: "https://webturnosanabelen.vercel.app",
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