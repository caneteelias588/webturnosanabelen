"use client";
import { useState } from "react";
import Calendar from "../components/Calendar"; 
import { initMercadoPago } from "@mercadopago/sdk-react";

// Tu clave pública
initMercadoPago("APP_USR-7e79393b-0105-4b71-923f-xxxxxxxxxxxx");

export default function ReservarPage() {
  const [selectedDia, setSelectedDia] = useState<string | null>(null);
  const [selectedHora, setSelectedHora] = useState<string | null>(null);
  const [nombrePaciente, setNombrePaciente] = useState("");
  const [dniPaciente, setDniPaciente] = useState("");
  const [telefonoPaciente, setTelefonoPaciente] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [cargando, setCargando] = useState(false);

  const [servicioPrincipal, setServicioPrincipal] = useState<"consulta" | "apto" | null>(null);
  const [subTipoConsulta, setSubTipoConsulta] = useState<"particular" | "obrasocial" | null>(null);

  const getDatosServicio = () => {
    if (servicioPrincipal === "apto") {
      return { titulo: "Aptos / Certificados", total: 15000, sena: 7500 };
    }
    if (servicioPrincipal === "consulta") {
      if (subTipoConsulta === "particular") return { titulo: "Consulta Particular", total: 22000, sena: 11000 };
      if (subTipoConsulta === "obrasocial") return { titulo: "Consulta Obra Social", total: 18000, sena: 9000 };
    }
    return null;
  };
  const servicioActual = getDatosServicio();

  const handlePagar = async () => {
    if (!servicioActual || !selectedDia || !selectedHora || !nombrePaciente || !dniPaciente || !telefonoPaciente || !motivoConsulta) {
      alert("Por favor completá todos los campos.");
      return;
    }

    setCargando(true);
    try {
      const descripcion = `${servicioActual.titulo} - ${nombrePaciente}`;
      
      // ENVIAMOS TODO AL BACKEND PARA QUE MERCADO PAGO LO GUARDE
      const response = await fetch("/api/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monto: servicioActual.sena,
          nombre: descripcion,
          dia: selectedDia,
          hora: selectedHora,
          // Agregamos estos datos para que el Webhook sepa a quién pertenece el pago
          datosPaciente: {
            nombre: nombrePaciente,
            dni: dniPaciente,
            tel: telefonoPaciente,
            motivo: motivoConsulta,
            servicio: servicioActual.titulo
          }
        }),
      });
      
      const data = await response.json();
      if (data.url) {
        // Guardamos por las dudas localmente, pero ya no dependemos de esto
        localStorage.setItem("datosTurnoTemp", JSON.stringify({
          dia: selectedDia, hora: selectedHora, nombre: nombrePaciente
        }));
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      setCargando(false);
      alert("Hubo un error al procesar el pago.");
    }
  };

  // ... (El resto del return y estilos se mantienen exactamente igual que los tenías)
  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "0 20px" }}>
      <h1 style={{ color: "#db2777", textAlign: "center", marginBottom: "30px", fontSize: "2.5rem" }}>📅 Reservar Turno</h1>
      
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
          <h3 style={estiloTituloPaso}>3. Datos del Paciente</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <input type="text" placeholder="Nombre y Apellido completo" value={nombrePaciente} onChange={(e) => setNombrePaciente(e.target.value)} style={estiloInput} />
            <input type="number" placeholder="DNI del Paciente" value={dniPaciente} onChange={(e) => setDniPaciente(e.target.value)} style={estiloInput} />
            <input type="tel" placeholder="Número de Teléfono (Celular)" value={telefonoPaciente} onChange={(e) => setTelefonoPaciente(e.target.value)} style={estiloInput} />
            <textarea placeholder="¿Cuál es el motivo de la consulta? (Breve descripción)" value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} style={{ ...estiloInput, height: "100px", resize: "none" }} />
          </div>
        </div>
      )}

      {/* RESUMEN FINAL */}
      {nombrePaciente && dniPaciente && telefonoPaciente && motivoConsulta && servicioActual && (
        <div style={{ ...estiloTarjeta, border: "4px solid #db2777", backgroundColor: "#fff1f2" }}>
          <h3 style={{ ...estiloTituloPaso, color: "#be185d", textAlign: "center", borderBottom: "none" }}>📝 Resumen del Turno</h3>
          <div style={{ color: "#374151", fontSize: "1.3rem", marginBottom: "30px", lineHeight: "1.8", backgroundColor: "white", padding: "25px", borderRadius: "20px" }}>
            <p><strong>Servicio:</strong> {servicioActual.titulo}</p>
            <p><strong>Fecha:</strong> {selectedDia} a las {selectedHora}hs</p>
            <p><strong>Paciente:</strong> {nombrePaciente}</p>
            <p><strong>DNI:</strong> {dniPaciente}</p>
            <div style={{ borderTop: "3px dashed #eee", marginTop: "20px", paddingTop: "20px", display: "flex", justifyContent: "space-between", color: "#db2777", fontWeight: "bold", fontSize: "1.6rem" }}>
              <span>Seña (50%):</span>
              <span>${servicioActual.sena}</span>
            </div>
            <p style={{ color: "#ef4444", fontSize: "1rem", marginTop: "15px", textAlign: "center", fontWeight: "bold", fontStyle: "italic" }}>
              * Importante: La seña no es reembolsable en caso de inasistencia.
            </p>
          </div>
          <button onClick={handlePagar} disabled={cargando} style={{ width: "100%", padding: "25px", backgroundColor: "#009ee3", color: "white", border: "none", borderRadius: "20px", fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 8px 20px rgba(0, 158, 227, 0.3)" }}>
            {cargando ? "Procesando..." : `Confirmar y Pagar Seña ($${servicioActual.sena})`}
          </button>
        </div>
      )}
    </div>
  );
}

// Estilos (sin cambios)
const estiloTarjeta = { backgroundColor: "white", padding: "40px", borderRadius: "30px", marginBottom: "35px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" };
const estiloTituloPaso = { color: "#db2777", marginBottom: "30px", fontSize: "1.7rem", borderBottom: "4px solid #fce7f3", paddingBottom: "15px", fontWeight: "bold" };
const estiloInput = { padding: "20px", borderRadius: "15px", border: "3px solid #e5e7eb", fontSize: "1.2rem", outlineColor: "#db2777", color: "#1f2937", width: "100%", boxSizing: "border-box" as const };
const estiloBotonSeleccion = (activo: boolean) => ({ flex: "1 1 220px", padding: "30px", borderRadius: "20px", border: activo ? "4px solid #db2777" : "3px solid #e5e7eb", backgroundColor: activo ? "#fff1f2" : "white", color: activo ? "#db2777" : "#4b5563", fontSize: "1.3rem", fontWeight: "bold" as const, cursor: "pointer", transition: "all 0.2s" });
const estiloSubBoton = (activo: boolean) => ({ flex: "1 1 180px", padding: "20px", borderRadius: "15px", border: "none", backgroundColor: activo ? "#db2777" : "white", color: activo ? "white" : "#db2777", fontWeight: "bold" as const, cursor: "pointer", boxShadow: "0 6px 15px rgba(0,0,0,0.1)", fontSize: "1.2rem", outline: activo ? "none" : "3px solid #db2777" });