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
      if (subTipoConsulta === "particular") return { titulo: "Consulta Particular", total: 30000, sena: 15000 };
      if (subTipoConsulta === "obrasocial") return { titulo: "Consulta Obra Social", total: 20000, sena: 10000 };
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
      
      const response = await fetch("/api/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monto: servicioActual.sena,
          nombre: descripcion,
          dia: selectedDia,
          hora: selectedHora,
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

  return (
    <div style={{ maxWidth: "780px", margin: "30px auto 60px auto", padding: "0 20px" }}>
      
      {/* ENCABEZADO INSTITUCIONAL */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <span style={{ 
          display: "inline-block", 
          padding: "5px 14px", 
          backgroundColor: "#fce7f3", 
          color: "#be185d", 
          borderRadius: "30px", 
          fontSize: "0.78rem", 
          fontWeight: "700",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          Gestión de Turnos Online
        </span>
        <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: "700", color: "#1f2937", letterSpacing: "-0.5px" }}>
          Reserva de Turno
        </h1>
        <p style={{ margin: "8px 0 0 0", color: "#6b7280", fontSize: "0.98rem" }}>
          Completá los pasos para agendar la atención pediátrica
        </p>
      </div>
      
      {/* PASO 1 */}
      <div style={estiloTarjeta}>
        <div style={cabeceraPaso}>
          <span style={numeroPaso}>1</span>
          <h2 style={estiloTituloPaso}>Seleccioná el tipo de atención</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: servicioPrincipal === "consulta" ? "20px" : 0 }}>
          <button 
            type="button"
            onClick={() => { setServicioPrincipal("consulta"); setSubTipoConsulta(null); }} 
            style={estiloBotonCard(servicioPrincipal === "consulta")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontWeight: "700", fontSize: "1.05rem", color: servicioPrincipal === "consulta" ? "#be185d" : "#111827" }}>
                Consulta Médica
              </span>
              <span style={{ fontSize: "0.85rem", color: servicioPrincipal === "consulta" ? "#db2777" : "#9ca3af" }}>
                {servicioPrincipal === "consulta" ? "● Seleccionado" : "○"}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280", lineHeight: "1.4" }}>
              Control de crecimiento, diagnóstico, seguimiento y atención pediátrica integral.
            </p>
          </button>

          <button 
            type="button"
            onClick={() => { setServicioPrincipal("apto"); setSubTipoConsulta(null); }} 
            style={estiloBotonCard(servicioPrincipal === "apto")}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontWeight: "700", fontSize: "1.05rem", color: servicioPrincipal === "apto" ? "#be185d" : "#111827" }}>
                Aptos y Certificados
              </span>
              <span style={{ fontSize: "0.85rem", color: servicioPrincipal === "apto" ? "#db2777" : "#9ca3af" }}>
                {servicioPrincipal === "apto" ? "● Seleccionado" : "○"}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280", lineHeight: "1.4" }}>
              Fichas médicas escolares, aptos físicos deportivos e informes de salud.
            </p>
          </button>
        </div>
        
        {/* SUB-MODALIDAD DE CONSULTA */}
        {servicioPrincipal === "consulta" && (
          <div style={{ backgroundColor: "#fdf2f8", padding: "22px 24px", borderRadius: "16px", border: "1px solid #fce7f3", marginTop: "18px" }}>
            <p style={{ color: "#9d174d", fontWeight: "700", margin: "0 0 14px 0", fontSize: "0.95rem" }}>
              Seleccioná la modalidad de arancel:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              <button 
                type="button"
                onClick={() => setSubTipoConsulta("particular")} 
                style={estiloSubModalidad(subTipoConsulta === "particular")}
              >
                <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>Particular</div>
                <div style={{ fontSize: "1.1rem", marginTop: "4px", fontWeight: "700" }}>$30.000</div>
                <div style={{ fontSize: "0.78rem", opacity: 0.85, marginTop: "2px" }}>Seña requerida: $15.000</div>
              </button>

              <button 
                type="button"
                onClick={() => setSubTipoConsulta("obrasocial")} 
                style={estiloSubModalidad(subTipoConsulta === "obrasocial")}
              >
                <div style={{ fontWeight: "700", fontSize: "0.95rem" }}>Obra Social</div>
                <div style={{ fontSize: "1.1rem", marginTop: "4px", fontWeight: "700" }}>$20.000</div>
                <div style={{ fontSize: "0.78rem", opacity: 0.85, marginTop: "2px" }}>Seña requerida: $10.000</div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PASO 2 */}
      {(servicioPrincipal === "apto" || (servicioPrincipal === "consulta" && subTipoConsulta)) && (
        <div style={estiloTarjeta}>
          <div style={cabeceraPaso}>
            <span style={numeroPaso}>2</span>
            <h2 style={estiloTituloPaso}>Seleccioná fecha y horario de consulta</h2>
          </div>
          <Calendar selectedDia={selectedDia} selectedHora={selectedHora} onSelectDia={setSelectedDia} onSelectHora={setSelectedHora} />
        </div>
      )}

      {/* PASO 3 */}
      {selectedDia && selectedHora && (
        <div style={estiloTarjeta}>
          <div style={cabeceraPaso}>
            <span style={numeroPaso}>3</span>
            <h2 style={estiloTituloPaso}>Datos del paciente</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={estiloLabel}>Nombre y apellido del paciente</label>
              <input type="text" placeholder="Ej: Sofía González" value={nombrePaciente} onChange={(e) => setNombrePaciente(e.target.value)} style={estiloInput} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
              <div>
                <label style={estiloLabel}>DNI del paciente</label>
                <input type="number" placeholder="Sin puntos" value={dniPaciente} onChange={(e) => setDniPaciente(e.target.value)} style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Teléfono de contacto (Celular / WhatsApp)</label>
                <input type="tel" placeholder="Ej: 3876123456" value={telefonoPaciente} onChange={(e) => setTelefonoPaciente(e.target.value)} style={estiloInput} />
              </div>
            </div>

            <div>
              <label style={estiloLabel}>Motivo de la consulta</label>
              <textarea placeholder="Breve descripción del motivo de atención..." value={motivoConsulta} onChange={(e) => setMotivoConsulta(e.target.value)} style={{ ...estiloInput, height: "90px", resize: "none" }} />
            </div>
          </div>
        </div>
      )}

      {/* RESUMEN FINAL */}
      {nombrePaciente && dniPaciente && telefonoPaciente && motivoConsulta && servicioActual && (
        <div style={{ ...estiloTarjeta, border: "1px solid #fbcfe8", backgroundColor: "#fff" }}>
          <div style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: "16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "0.8rem", color: "#db2777", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Resumen de confirmación</span>
              <h3 style={{ margin: "2px 0 0 0", color: "#111827", fontSize: "1.3rem", fontWeight: "700" }}>Detalle del Turno</h3>
            </div>
            <span style={{ backgroundColor: "#fdf2f8", color: "#db2777", padding: "6px 12px", borderRadius: "10px", fontSize: "0.85rem", fontWeight: "600" }}>
              Paso Final
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "22px", backgroundColor: "#f9fafb", padding: "18px 20px", borderRadius: "14px" }}>
            <div>
              <div style={estiloDetalleLabel}>Servicio</div>
              <div style={estiloDetalleValor}>{servicioActual.titulo}</div>
            </div>
            <div>
              <div style={estiloDetalleLabel}>Fecha y Hora</div>
              <div style={estiloDetalleValor}>{selectedDia} • {selectedHora} hs</div>
            </div>
            <div>
              <div style={estiloDetalleLabel}>Paciente</div>
              <div style={estiloDetalleValor}>{nombrePaciente}</div>
            </div>
            <div>
              <div style={estiloDetalleLabel}>DNI</div>
              <div style={estiloDetalleValor}>{dniPaciente}</div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ color: "#6b7280", fontSize: "0.95rem" }}>Arancel total de la consulta:</span>
              <span style={{ color: "#374151", fontWeight: "600", fontSize: "1.05rem" }}>${servicioActual.total.toLocaleString("es-AR")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#be185d", fontWeight: "700", fontSize: "1.35rem" }}>
              <span>Seña requerida online (50%):</span>
              <span>${servicioActual.sena.toLocaleString("es-AR")}</span>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "10px 0 0 0", fontStyle: "italic", textAlign: "right" }}>
              * El 50% restante se abona presencialmente el día de la consulta. La seña no es reintegrable por inasistencia sin aviso previo.
            </p>
          </div>

          <button 
            type="button"
            onClick={handlePagar} 
            disabled={cargando} 
            style={{ 
              width: "100%", 
              padding: "16px 24px", 
              backgroundColor: "#009ee3", 
              color: "white", 
              border: "none", 
              borderRadius: "14px", 
              fontSize: "1.1rem", 
              fontWeight: "700", 
              cursor: cargando ? "not-allowed" : "pointer", 
              boxShadow: "0 6px 18px rgba(0, 158, 227, 0.28)",
              transition: "transform 0.15s, background-color 0.2s",
              opacity: cargando ? 0.7 : 1
            }}
          >
            {cargando ? "Redirigiendo a Mercado Pago..." : `Abonar Seña de $${servicioActual.sena.toLocaleString("es-AR")} con Mercado Pago`}
          </button>
        </div>
      )}
    </div>
  );
}

// Estilos limpios y formales
const estiloTarjeta = { 
  backgroundColor: "#ffffff", 
  padding: "32px 30px", 
  borderRadius: "22px", 
  marginBottom: "25px", 
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
  border: "1px solid #f3f4f6"
};

const cabeceraPaso = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "22px",
  borderBottom: "1px solid #f3f4f6",
  paddingBottom: "14px"
};

const numeroPaso = {
  backgroundColor: "#db2777",
  color: "#ffffff",
  borderRadius: "50%",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.88rem",
  fontWeight: "bold" as const,
  flexShrink: 0
};

const estiloTituloPaso = { 
  margin: 0, 
  fontSize: "1.15rem", 
  color: "#111827", 
  fontWeight: "700" as const
};

const estiloLabel = {
  display: "block",
  fontSize: "0.84rem",
  fontWeight: "600" as const,
  color: "#4b5563",
  marginBottom: "6px"
};

const estiloInput = { 
  padding: "12px 16px", 
  borderRadius: "12px", 
  border: "1.5px solid #e5e7eb", 
  fontSize: "0.98rem", 
  outline: "none", 
  color: "#1f2937", 
  width: "100%", 
  boxSizing: "border-box" as const,
  backgroundColor: "#ffffff",
  transition: "border-color 0.2s"
};

const estiloBotonCard = (activo: boolean) => ({
  padding: "20px",
  borderRadius: "14px",
  border: activo ? "2px solid #db2777" : "1.5px solid #e5e7eb",
  backgroundColor: activo ? "#fdf2f8" : "#ffffff",
  cursor: "pointer",
  textAlign: "left" as const,
  transition: "all 0.2s",
  boxShadow: activo ? "0 4px 12px rgba(219, 39, 119, 0.1)" : "none"
});

const estiloSubModalidad = (activo: boolean) => ({
  padding: "14px 16px",
  borderRadius: "12px",
  border: activo ? "2px solid #db2777" : "1.5px solid #fce7f3",
  backgroundColor: activo ? "#db2777" : "#ffffff",
  color: activo ? "#ffffff" : "#374151",
  cursor: "pointer",
  textAlign: "left" as const,
  transition: "all 0.2s",
  boxShadow: activo ? "0 4px 12px rgba(219, 39, 119, 0.25)" : "none"
});

const estiloDetalleLabel = {
  fontSize: "0.78rem",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
  fontWeight: "600" as const
};

const estiloDetalleValor = {
  fontSize: "0.95rem",
  fontWeight: "700" as const,
  color: "#1f2937"
};