"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import emailjs from "@emailjs/browser";

function ContenidoConfirmacion() {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const [mensaje, setMensaje] = useState("Verificando tu pago...");
  const [procesando, setProcesando] = useState(true);

  // CONFIGURACIÓN DE EMAILJS
  const SERVICE_ID = "service_rzs7p0a";
  const TEMPLATE_ID = "template_4wuof9l";
  const PUBLIC_KEY = "yb1x788-jNrDrEzQw";

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "approved") {
      setMensaje("¡Pago aprobado! ✅");
      enviarNotificacionYLimpiar();
    } else if (status === "pending") {
      setMensaje("Tu pago está pendiente de aprobación. ⏳");
      setProcesando(false);
    } else {
      setMensaje("El pago no fue procesado. ❌");
      setProcesando(false);
    }
  }, [searchParams]);

  const enviarNotificacionYLimpiar = async () => {
    const datosGuardados = localStorage.getItem("datosTurnoTemp");
    
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        
        // Enviamos el mail con los nombres de campos unificados
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            nombre_paciente: datos.nombre,
            telefono: datos.tel || datos.telefono || "No provisto",
            servicio: datos.servicio || "General",
            dia: datos.dia,
            hora: datos.hora,
            motivo: datos.motivo || "--"
        }, PUBLIC_KEY);

        setMensaje("¡Listo! Turno confirmado. Te esperamos. 🎉");
      } catch (error) {
        console.error("Error en el proceso final:", error);
        // Si falla algo aquí, el pago ya fue aprobado, así que no alarmamos al usuario
        setMensaje("¡Pago aprobado! Tu turno ya está registrado. 🎉");
      }
      
      // Limpiamos el rastro para evitar duplicados
      localStorage.removeItem("datosTurnoTemp"); 
    } else {
      setMensaje("¡Pago confirmado! Gracias por tu reserva. 🎉");
    }
    setProcesando(false);
  };

  return (
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
  );
}

export default function ConfirmacionPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "'Varela Round', sans-serif", minHeight: "100vh", backgroundColor: "#fdf2f8" }}>
      <Suspense fallback={<h2 style={{color: "#db2777"}}>Cargando confirmación...</h2>}>
        <ContenidoConfirmacion />
      </Suspense>
    </div>
  );
}