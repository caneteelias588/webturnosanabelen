import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! });

export async function POST(req: Request) {
  try {
    const { monto, nombre, dia, hora, datosPaciente } = await req.json();
    const preference = new Preference(client);
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
        // EMPAQUETADO UNIFICADO: Usamos nombres cortos y claros
        external_reference: JSON.stringify({
          nombre: nombre,
          dia: dia,
          hora: hora,
          tel: datosPaciente.tel || datosPaciente.telefono || "No provisto",
          servicio: datosPaciente.servicio || "General",
          dni: datosPaciente.dni || "--",
          motivo: datosPaciente.motivo || "Consulta"
        }),
        notification_url: `${URL_BASE}/api/webhook?source=mercadopago`,
        back_urls: {
          success: `${URL_BASE}/confirmacion?status=approved`,
          failure: `${URL_BASE}/confirmacion?status=failure`,
          pending: `${URL_BASE}/confirmacion?status=pending`,
        },
        auto_return: "approved",
        binary_mode: true,
      },
    });

    return Response.json({ url: result.init_point });
  } catch (error) {
    console.error("Error MP:", error);
    return Response.json({ error: "Error al crear la preferencia" }, { status: 500 });
  }
}