"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "../firebase"; // Importamos tu conexión
import { collection, addDoc } from "firebase/firestore"; // Funciones para guardar

function ConfirmacionContenido() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mensaje, setMensaje] = useState("Procesando tu reserva... ⏳");

  useEffect(() => {
    const procesarReserva = async () => {
      const status = searchParams.get("status");
      const dia = searchParams.get("dia");
      const hora = searchParams.get("hora");
      const nombre = searchParams.get("nombre");

      // Si el pago salió bien, guardamos en la base de datos
      if (status === "approved" && dia && hora && nombre) {
        try {
          await addDoc(collection(db, "turnos"), {
            dia,
            hora,
            nombre,
            pagado_el: new Date()
          });
          
          setMensaje(`¡Listo ${nombre}! Tu turno del ${dia} a las ${hora}hs está confirmado. ✅`);
          // Volver al inicio en 8 segundos
          setTimeout(() => router.push("/"), 8000);

        } catch (error) {
          console.error("Error guardando:", error);
          setMensaje("Tu pago entró, pero hubo un error guardando el turno. Sacale captura y avisanos.");
        }
      } else {
        setMensaje("Hubo un problema con el pago o volviste atrás.");
      }
    };

    procesarReserva();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: "#db2777" }}>Estado de la Reserva</h1>
        <p style={{ fontSize: "1.2rem", color: "#374151" }}>{mensaje}</p>
        <button onClick={() => router.push("/")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#db2777", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>Volver al Inicio</button>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ConfirmacionContenido />
    </Suspense>
  );
}