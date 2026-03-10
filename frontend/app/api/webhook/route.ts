import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mercado Pago manda mucha info, a nosotros nos interesa el 'payment'
    if (body.type === 'payment') {
      const paymentId = body.data.id;

      // 1. Consultamos a Mercado Pago para confirmar que el pago es real y está aprobado
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` // Tu Token de Mercado Pago
        }
      });

      const payment = await res.json();

      if (payment.status === 'approved') {
        // 2. ACÁ VA TU MAGIA:
        // Sacamos la info del turno que guardamos en 'external_reference' al crear el pago
        const infoTurno = JSON.parse(payment.external_reference); 
        
        // 3. LLAMAR A TU FUNCIÓN QUE GUARDA EL TURNO
        // Ejemplo: await guardarTurnoConfirmado(infoTurno.fecha, infoTurno.hora, infoTurno.paciente);
        
        console.log("✅ Turno confirmado y guardado para:", infoTurno.paciente);
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error("❌ Error en Webhook:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}