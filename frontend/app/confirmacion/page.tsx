"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import emailjs from "@emailjs/browser";
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";

function ContenidoConfirmacion() {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const [mensaje, setMensaje] = useState("Verificando tu pago...");
  const [procesando, setProcesando] = useState(true);

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "approved") {
      setMensaje("¡Pago aprobado! Registrando tu turno... ✅");
      procesarTurno();
    } else {
      setMensaje("El pago no fue procesado. ❌");
      setProcesando(false);
    }
  }, [searchParams]);

  const procesarTurno = async () => {
    const datosGuardados = localStorage.getItem("datosTurnoTemp");
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        // 1. GUARDAR EN FIREBASE (Usamos 'fecha' para que el calendario lo lea)
        await addDoc(collection(db, "turnos"), {
          nombre: datos.nombre,
          dni: datos.dni || "--",
          telefono: datos.tel || datos.telefono || "--",
          fecha: datos.dia, // YYYY-MM-DD
          hora: datos.hora,
          motivo: datos.motivo || "--",
          servicio: datos.servicio || "General",
          estado: "confirmado",
          fechaRegistro: new Date().toISOString()
        });

        // 2. MANDAR EMAIL (Nombres unificados para tu plantilla)
        await emailjs.send("service_rzs7p0a", "template_4wuof9l", {
            nombre_paciente: datos.nombre,
            telefono: datos.tel || datos.telefono || "--",
            servicio: datos.servicio || "General",
            dia: datos.dia,
            hora: datos.hora
        }, "yb1x788-jNrDrEzQw");

        setMensaje("¡Listo! Turno confirmado y registrado. 🎉");
      } catch (error) {
        console.error("Error:", error);
        setMensaje("Pago aprobado, pero hubo un error al registrar. Avisale a la Dra.");
      }
      localStorage.removeItem("datosTurnoTemp"); 
    }
    setProcesando(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "white", padding: "40px", borderRadius: "30px", textAlign: "center", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#374151" }}>{mensaje}</h2>
      {!procesando && (
        <button onClick={() => router.push("/")} style={{ marginTop: "20px", padding: "15px 30px", backgroundColor: "#009ee3", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>
          Volver al Inicio
        </button>
      )}
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <div style={{ padding: "50px", minHeight: "100vh", backgroundColor: "#fdf2f8", fontFamily: "sans-serif" }}>
      <Suspense fallback={<h2>Cargando...</h2>}>
        <ContenidoConfirmacion />
      </Suspense>
    </div>
  );
}