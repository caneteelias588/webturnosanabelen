import { NextResponse } from 'next/server';

// Forzamos a que Next.js no intente pre-renderizar esta ruta como estática
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📩 Webhook recibido:", body);

    // Mercado Pago puede mandar el ID en body.data.id o directamente en body.id
    const paymentId = body.data?.id || body.id;
    const type = body.type || body.action; // 'action' se usa en algunas versiones de MP

    if (paymentId && (type === 'payment' || type === 'payment.created' || type === 'payment.updated')) {
      
      // 1. Consultamos a Mercado Pago para confirmar el estado
      // IMPORTANTE: Asegurate de que en Vercel la variable se llame MERCADOPAGO_ACCESS_TOKEN
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
        }
      });

      if (res.ok) {
        const payment = await res.json();

        if (payment.status === 'approved') {
          // 2. Extraemos la info del turno
          const infoTurno = JSON.parse(payment.external_reference); 
          
          // ACÁ es donde luego conectarás tu función de Firebase
          // Ejemplo: await guardarEnFirebase(infoTurno);
          
          console.log("✅ Turno confirmado para:", infoTurno.nombre || infoTurno.paciente);
        }
      }
    }

    // SIEMPRE devolvemos 200 OK rápido para que Mercado Pago no se quede esperando
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("❌ Error en Webhook:", error);
    // Devolvemos 200 aunque falle el proceso interno para que MP no reintente infinitamente
    return new Response(JSON.stringify({ message: "Error recibido pero procesado" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Agregamos GET para evitar el error 405 si alguien (o MP) testea la URL manualmente
export async function GET() {
  return new Response(JSON.stringify({ message: "El webhook está vivo, pero espera un POST" }), {
    status: 200,
  });
}