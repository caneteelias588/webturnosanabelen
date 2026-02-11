"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import emailjs from "@emailjs/browser";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const [mensaje, setMensaje] = useState("Procesando tu pago...");
  const [procesando, setProcesando] = useState(true);

  // 👇 TUS CLAVES DE EMAILJS (YA CONFIGURADAS)
  const SERVICE_ID = "service_rzs7p0a";
  const TEMPLATE_ID = "template_4wuof9l";
  const PUBLIC_KEY = "yb1x788-jNrDrEzQw";

  useEffect(() => {
    // Solo ejecutamos si Mercado Pago nos devuelve "approved"
    if (searchParams.get("status") === "approved") {
      procesarTurno();
    } else {
      setMensaje("El pago no fue aprobado o está pendiente. ❌");
      setProcesando(false);
    }
  }, [searchParams]);

  const procesarTurno = async () => {
    // 1. Recuperamos los datos que guardamos antes de ir a pagar
    const datosGuardados = localStorage.getItem("datosTurnoTemp");
    
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      setMensaje("Pago aprobado ✅. Confirmando turno...");

      try {
        // 2. Guardamos en Firebase (Base de datos)
        await addDoc(collection(db, "turnos"), {
          dia: datos.dia,
          hora: datos.hora,
          nombre: datos.nombre,
          telefono: datos.telefono,
          servicio: datos.servicio,
          pagado: true,
          fechaReserva: new Date().toISOString()
        });

        // 3. Enviamos el mail a la Dra. Ana
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            nombre_paciente: datos.nombre,
            telefono: datos.telefono,
            servicio: datos.servicio,
            dia: datos.dia,
            hora: datos.hora
        }, PUBLIC_KEY);

        setMensaje("¡Listo! Turno confirmado. Te esperamos. 🎉");
        localStorage.removeItem("datosTurnoTemp"); // Limpiamos para que no quede basura

      } catch (error) {
        console.error("Error:", error);
        setMensaje("Turno guardado, pero hubo un error al notificar.");
      }
    } else {
      setMensaje("No se encontraron los datos del turno.");
    }
    setProcesando(false);
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "'Varela Round', sans-serif", minHeight: "100vh", backgroundColor: "#fdf2f8" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "30px", boxShadow: "0 10px 40px rgba(219, 39, 119, 0.15)" }}>
        
        <h1 style={{ color: "#db2777", fontSize: "4rem", marginBottom: "20px" }}>
          {procesando ? "⏳" : "✅"}
        </h1>
        
        <h2 style={{ color: "#374151", marginBottom: "30px", fontSize: "1.5rem" }}>{mensaje}</h2>
        
        {!procesando && (
          <button 
            onClick={() => router.push("/")} 
            style={{ 
              padding: "18px 40px", 
              backgroundColor: "#009ee3", 
              color: "white", 
              border: "none",
              borderRadius: "50px", 
              fontWeight: "bold", 
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0, 158, 227, 0.3)"
            }}
          >
            Volver al Inicio
          </button>
        )}
      </div>
    </div>
  );
}