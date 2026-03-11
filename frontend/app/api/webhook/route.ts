import { NextResponse } from 'next/server';
import { db } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const paymentId = body.data?.id || body.id;
    const type = body.type || body.action;

    if (paymentId && (type?.includes('payment'))) {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}` }
      });

      if (res.ok) {
        const payment = await res.json();
        if (payment.status === 'approved') {
          const info = JSON.parse(payment.external_reference || "{}"); 
          
          // GUARDADO EN FIREBASE CON NOMBRES UNIFICADOS
          await addDoc(collection(db, "turnos"), {
            nombre: info.nombre || "Sin nombre",
            dni: info.dni || "--",
            telefono: info.tel || "--",
            fecha: info.dia || "--",
            hora: info.hora || "--",
            motivo: info.motivo || "--",
            servicio: info.servicio || "--",
            paymentId: String(paymentId),
            estado: "confirmado",
            fechaRegistro: new Date().toISOString()
          });
          console.log("✅ Firebase actualizado");
        }
      }
    }
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("❌ Error Webhook:", error);
    return new Response(JSON.stringify({ message: "Error" }), { status: 200 });
  }
}