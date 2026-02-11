"use client";

import { useState, useEffect, useRef } from "react";
import Calendar from "./components/Calendar";
import { initMercadoPago } from "@mercadopago/sdk-react";

// Tu clave pública
initMercadoPago("APP_USR-7e79393b-0105-4b71-923f-xxxxxxxxxxxx");

export default function Home() {
  // --- ESTADOS ---
  const [selectedDia, setSelectedDia] = useState<string | null>(null);
  const [selectedHora, setSelectedHora] = useState<string | null>(null);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [telefonoPaciente, setTelefonoPaciente] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estados de Servicio
  const [servicioPrincipal, setServicioPrincipal] = useState<"consulta" | "apto" | null>(null);
  const [subTipoConsulta, setSubTipoConsulta] = useState<"particular" | "obrasocial" | null>(null);

  // Ref para scroll
  const seccionReservasRef = useRef<HTMLDivElement>(null);
  const scrollToReservas = () => seccionReservasRef.current?.scrollIntoView({ behavior: "smooth" });

  // Carrusel de Fotos (3 FOTOS)
  const imagenes = ["/perfil.jpg", "/perfil1.jpg", "/perfil2.jpg"];
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  // Calcular Precios
  const getDatosServicio = () => {
    if (servicioPrincipal === "apto") return { titulo: "Apto Físico / ANSES", total: 15000, sena: 7500 };
    if (servicioPrincipal === "consulta") {
      if (subTipoConsulta === "particular") return { titulo: "Consulta Particular", total: 22000, sena: 11000 };
      if (subTipoConsulta === "obrasocial") return { titulo: "Consulta Obra Social", total: 18000, sena: 9000 };
    }
    return null;
  };
  const servicioActual = getDatosServicio();

  // Función de Pago
  const handlePagar = async () => {
    if (!servicioActual || !selectedDia || !selectedHora || !nombrePaciente || !telefonoPaciente) {
      alert("Por favor completá todos los pasos.");
      return;
    }

    // 👇 ESTO ES LO NUEVO: Guardamos los datos antes de irnos a Mercado Pago
    // Así la página de confirmación sabe a quién mandarle el mail.
    localStorage.setItem("datosTurnoTemp", JSON.stringify({
      dia: selectedDia,
      hora: selectedHora,
      nombre: nombrePaciente,
      telefono: telefonoPaciente,
      servicio: servicioActual.titulo
    }));
    // 👆 FIN DE LO NUEVO

    setCargando(true);
    try {
      const descripcion = `${servicioActual.titulo} - Paciente: ${nombrePaciente} (Tel: ${telefonoPaciente})`;
      const response = await fetch("/api/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monto: servicioActual.sena,
          nombre: descripcion,
          dia: selectedDia,
          hora: selectedHora,
        }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  return (
    // 1. FONDO PRINCIPAL
    <div style={{ fontFamily: "'Varela Round', sans-serif", backgroundImage: "url('/fondos.jpg')", backgroundSize: "600px", minHeight: "100vh", padding: "20px" }}>
      
      {/* 2. TARJETA PRINCIPAL */}
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "30px", overflow: "hidden", boxShadow: "0 10px 40px rgba(219, 39, 119, 0.2)" }}>
        
        {/* HEADER ROSA */}
        <header style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", padding: "40px 30px", color: "white", position: "relative" }}>
          <div style={{ position: "absolute", top: "20px", right: "20px", backgroundColor: "white", padding: "5px", borderRadius: "12px" }}>
            <img src="/perfil3.jpg" alt="Logo" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "25px", flexWrap: "wrap" }}>
            <img src="/perfil.jpg" alt="Dra. Ana" style={{ width: "120px", height: "120px", borderRadius: "50%", border: "5px solid rgba(255,255,255,0.8)", objectFit: "cover" }} />
            <div>
              <h1 style={{ margin: 0, fontSize: "2.5rem", fontWeight: "bold" }}>Dra. Ana Belén</h1>
              <p style={{ margin: "8px 0 0 0", fontSize: "1.3rem", opacity: 0.9 }}>Médica. MP 7327 🩺</p>
            </div>
          </div>
        </header>

        {/* CONTENIDO DE LA PORTADA */}
        <div style={{ padding: "40px 35px" }}>
          
          {/* DESCRIPCIÓN */}
          <div style={{ textAlign: "center", color: "#374151", marginBottom: "40px", lineHeight: "1.7", fontSize: "1.3rem" }}>
            <p style={{ marginBottom: "20px" }}>
              En mi consultorio médico ofrezco atención integral a niños y adolescentes, abarcando desde consultas de rutina hasta tratamientos especializados.
            </p>
            <p>
              Acompañemos el crecimiento de los niños con una atención amorosa, respetuosa y dedicada, cuidando su salud y la tranquilidad de la familia.
            </p>
          </div>

          {/* CARRUSEL CUADRADO */}
          <div style={{ 
              width: "100%", 
              maxWidth: "550px",
              aspectRatio: "1 / 1",
              margin: "0 auto 50px auto",
              borderRadius: "25px", 
              overflow: "hidden", 
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              border: "6px solid #fff1f2"
          }}>
            <img 
              src={imagenes[imagenActual]} 
              alt="Consultorio" 
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", transition: "opacity 0.5s ease" }} 
            />
          </div>

          {/* Botón para Bajar */}
          <div style={{ textAlign: "center" }}>
            <button 
              onClick={scrollToReservas}
              style={{ padding: "20px 60px", fontSize: "1.5rem", backgroundColor: "#db2777", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 8px 25px rgba(219, 39, 119, 0.4)", transition: "transform 0.1s" }}
            >
              📅 Reservar un Turno
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN DE RESERVAS */}
      <div ref={seccionReservasRef} style={{ maxWidth: "800px", margin: "50px auto", paddingBottom: "60px" }}>
        
        {/* PASO 1 */}
        <div style={estiloTarjeta}>
          <h3 style={estiloTituloPaso}>1. ¿Qué tipo de turno necesitás?</h3>
          <div style={{ display: "flex", gap: "20px", marginBottom: "25px", flexWrap: "wrap" }}>
            <button onClick={() => { setServicioPrincipal("consulta"); setSubTipoConsulta(null); }} style={estiloBotonSeleccion(servicioPrincipal === "consulta")}>🩺 Consulta Médica</button>
            <button onClick={() => { setServicioPrincipal("apto"); setSubTipoConsulta(null); }} style={estiloBotonSeleccion(servicioPrincipal === "apto")}>📝 Aptos / Certificados</button>
          </div>
          
          {servicioPrincipal === "consulta" && (
            <div style={{ backgroundColor: "#fdf2f8", padding: "30px", borderRadius: "20px", border: "3px dashed #db2777", animation: "fadeIn 0.5s" }}>
              <p style={{ color: "#db2777", fontWeight: "bold", marginBottom: "20px", fontSize: "1.2rem" }}>Seleccioná la modalidad:</p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <button onClick={() => setSubTipoConsulta("particular")} style={estiloSubBoton(subTipoConsulta === "particular")}>Particular ($22.000)</button>
                <button onClick={() => setSubTipoConsulta("obrasocial")} style={estiloSubBoton(subTipoConsulta === "obrasocial")}>Obra Social ($18.000)</button>
              </div>
            </div>
          )}
        </div>

        {/* PASO 2 */}
        {(servicioPrincipal === "apto" || (servicioPrincipal === "consulta" && subTipoConsulta)) && (
          <div style={estiloTarjeta}>
            <h3 style={estiloTituloPaso}>2. Elegí Día y Hora</h3>
            <Calendar selectedDia={selectedDia} selectedHora={selectedHora} onSelectDia={setSelectedDia} onSelectHora={setSelectedHora} />
          </div>
        )}

        {/* PASO 3 */}
        {selectedDia && selectedHora && (
          <div style={estiloTarjeta}>
            <h3 style={estiloTituloPaso}>3. Tus Datos</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <input type="text" placeholder="Nombre y Apellido completo" value={nombrePaciente} onChange={(e) => setNombrePaciente(e.target.value)} style={estiloInput} />
              <input type="tel" placeholder="Número de Teléfono" value={telefonoPaciente} onChange={(e) => setTelefonoPaciente(e.target.value)} style={estiloInput} />
            </div>
          </div>
        )}

        {/* RESUMEN FINAL */}
        {nombrePaciente && telefonoPaciente && servicioActual && (
          <div style={{ ...estiloTarjeta, border: "4px solid #db2777", backgroundColor: "#fff1f2" }}>
            <h3 style={{ ...estiloTituloPaso, color: "#be185d", textAlign: "center", borderBottom: "none" }}>📝 Resumen del Turno</h3>
            <div style={{ color: "#374151", fontSize: "1.3rem", marginBottom: "30px", lineHeight: "1.8", backgroundColor: "white", padding: "25px", borderRadius: "20px" }}>
              <p><strong>Servicio:</strong> {servicioActual.titulo}</p>
              <p><strong>Fecha:</strong> {selectedDia} a las {selectedHora}hs</p>
              <p><strong>Paciente:</strong> {nombrePaciente}</p>
              <div style={{ borderTop: "3px dashed #eee", marginTop: "20px", paddingTop: "20px", display: "flex", justifyContent: "space-between", color: "#db2777", fontWeight: "bold", fontSize: "1.6rem" }}>
                <span>Seña (50%):</span>
                <span>${servicioActual.sena}</span>
              </div>
            </div>
            <button onClick={handlePagar} disabled={cargando} style={{ width: "100%", padding: "25px", backgroundColor: "#009ee3", color: "white", border: "none", borderRadius: "20px", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 8px 20px rgba(0, 158, 227, 0.3)" }}>
              {cargando ? "Procesando..." : `Confirmar y Pagar Seña ($${servicioActual.sena})`}
            </button>
          </div>
        )}
      </div>

      {/* 🟢 BOTÓN FLOTANTE WHATSAPP */}
      <a 
        href="https://wa.me/5493876405797?text=Hola%20Dra%20Ana%2C%20quisiera%20hacerle%20una%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: "#25D366",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          zIndex: 100,
          transition: "transform 0.2s"
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: "45px", height: "45px" }} />
      </a>

    </div>
  );
}

// --- ESTILOS ---
const estiloTarjeta = { backgroundColor: "white", padding: "40px", borderRadius: "30px", marginBottom: "35px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" };
const estiloTituloPaso = { color: "#db2777", marginBottom: "30px", fontSize: "1.7rem", borderBottom: "4px solid #fce7f3", paddingBottom: "15px", fontWeight: "bold" };
const estiloInput = { padding: "20px", borderRadius: "15px", border: "3px solid #e5e7eb", fontSize: "1.2rem", outlineColor: "#db2777", color: "#1f2937", width: "100%", boxSizing: "border-box" as const };

const estiloBotonSeleccion = (activo: boolean) => ({
  flex: "1 1 220px", padding: "30px", borderRadius: "20px", 
  border: activo ? "4px solid #db2777" : "3px solid #e5e7eb", 
  backgroundColor: activo ? "#fff1f2" : "white", 
  color: activo ? "#db2777" : "#4b5563", 
  fontSize: "1.3rem", fontWeight: "bold" as const, cursor: "pointer", transition: "all 0.2s"
});

const estiloSubBoton = (activo: boolean) => ({
  flex: "1 1 180px", padding: "20px", borderRadius: "15px", border: "none",
  backgroundColor: activo ? "#db2777" : "white", 
  color: activo ? "white" : "#db2777", 
  fontWeight: "bold" as const, cursor: "pointer", 
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)", 
  fontSize: "1.2rem",
  outline: activo ? "none" : "3px solid #db2777"
});