import { NextResponse } from 'next/server';
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";

// Esto evita errores de pre-renderizado en Vercel
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📩 Webhook recibido de Mercado Pago");

    // Buscamos el ID del pago
    const paymentId = body.data?.id || body.id;
    const type = body.type || body.action;

    if (paymentId && (type === 'payment' || type === 'payment.created' || type === 'payment.updated')) {
      
      // Consultamos a Mercado Pago para validar el pago
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
        }
      });

      if (res.ok) {
        const payment = await res.json();

        if (payment.status === 'approved') {
          // Extraemos la info del paciente que guardamos en external_reference
          const infoTurno = JSON.parse(payment.external_reference); 
          
          console.log("💾 Guardando turno en colección turnos para:", infoTurno.nombre);

          // Guardamos en Firebase con los nombres de campos de tu base de datos
          await addDoc(collection(db, "turnos"), {
            nombre: infoTurno.nombre,
            dni: infoTurno.dni,
            telefono: infoTurno.tel || infoTurno.telefono,
            fecha: infoTurno.dia,
            hora: infoTurno.hora,
            motivo: infoTurno.motivo,
            servicio: infoTurno.servicio,
            paymentId: paymentId,
            estado: "confirmado",
            fechaRegistro: new Date().toISOString()
          });
          
          console.log("✅ Turno guardado exitosamente.");
        }
      }
    }

    // Respuesta 200 obligatoria para Mercado Pago
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("❌ Error en Webhook:", error);
    // Devolvemos 200 para que MP no reintente infinitamente si hay un error de código
    return new Response(JSON.stringify({ message: "Error procesado" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Esta función permite que si entrás por el navegador veas un mensaje en vez de un error 405
export async function GET() {
  return new Response(JSON.stringify({ message: "El webhook está vivo, pero espera un POST de Mercado Pago" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}