"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [showThanks, setShowThanks] = useState(false);

  const obrasSociales = [
    "Avalian", "Unión Personal", "Boreal", "Bramed", "Galeno", "IPSS", 
    "Jerárquicos Salud", "OSDE", "OSFATLYF", "Swiss Medical", "OSPE", 
    "Sancor Salud", "Medifé", "Visitar", "Medical Group", "Mep Life", "y mas ..."
  ];

  const handleStarClick = (num: number) => {
    setRating(num);
    if (num === 5) setShowThanks(true);
  };

  return (
    <div style={{ padding: "40px 20px", minHeight: "100vh", backgroundColor: "#fff5f7" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", alignItems: "start" }}>
        
        {/* COLUMNA IZQUIERDA: CONVENIOS */}
        <div style={{ padding: "20px", borderRadius: "20px", border: "1px solid #fce7f3", backgroundColor: "white", boxShadow: "0 4px 15px rgba(219, 39, 119, 0.05)" }}>
          <h3 style={{ color: "#db2777", marginBottom: "15px", fontSize: "1.1rem", fontWeight: "bold" }}>Convenios vigentes</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {obrasSociales.map((os, i) => (
              <button key={i} className="obra-social-btn" style={estiloTagInteractiva}>{os}</button>
            ))}
          </div>
        </div>

        {/* COLUMNA CENTRAL: CONTENIDO PRINCIPAL */}
        <div style={{ gridColumn: "span 2", backgroundColor: "white", borderRadius: "30px", overflow: "hidden", boxShadow: "0 10px 40px rgba(219, 39, 119, 0.15)" }}>
          
          <header style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", padding: "40px", color: "white", textAlign: "center" }}>
            <div style={{ width: "130px", height: "130px", borderRadius: "50%", border: "5px solid rgba(255,255,255,0.3)", overflow: "hidden", margin: "0 auto 20px auto" }}>
              <img src="/perfil.jpg" alt="Dra. Ana" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <h1 style={{ margin: 0, fontSize: "2.5rem", fontWeight: "bold" }}>Dra. Ana Belén</h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.9 }}>Médica • MP 7327 🩺</p>
          </header>

          <div style={{ padding: "40px 30px" }}>
            {/* DESCRIPCIÓN EXACTA */}
            <div style={{ textAlign: "center", color: "#374151", marginBottom: "50px", lineHeight: "1.8", fontSize: "1.1rem" }}>
              <p style={{ marginBottom: "20px", fontWeight: "bold", color: "#db2777" }}>
                ¡Hola! Bienvenidos a mi consultorio digital. Aquí podrán reservar turnos de forma rápida y sencilla.
              </p>
              <p style={{ marginBottom: "20px" }}>
                En mi consultorio médico ofrezco atención integral a niños y adolescentes, abarcando desde consultas de rutina hasta tratamientos especializados.
              </p>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                "Acompañemos el crecimiento de los niños con una atención amorosa, respetuosa y dedicada, cuidando su salud y la tranquilidad de la familia."
              </p>
            </div>

            {/* GRILLA DE 4 RECUADROS (2x2) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "50px" }}>
              <div style={estiloBeneficio}>
                <div style={estiloIcono}>⚡</div>
                <h3 style={estiloTituloBeneficio}>Sin Esperas</h3>
                <p style={estiloTextoBeneficio}>Turnos exactos para respetar tu tiempo.</p>
              </div>
              <div style={estiloBeneficio}>
                <div style={estiloIcono}>🧸</div>
                <h3 style={estiloTituloBeneficio}>Atención Cálida</h3>
                <p style={estiloTextoBeneficio}>Espacio pensado para los más chicos.</p>
              </div>
              <div style={estiloBeneficio}>
                <div style={estiloIcono}>🏥</div>
                <h3 style={estiloTituloBeneficio}>Obras Sociales</h3>
                <p style={estiloTextoBeneficio}>Trabajamos con múltiples coberturas médicas.</p>
              </div>
              {/* EL CUARTO RECUADRO PARA COMPLETAR EL ESPACIO */}
              <div style={estiloBeneficio}>
                <div style={estiloIcono}>📍</div>
                <h3 style={estiloTituloBeneficio}>Ubicación</h3>
                <p style={estiloTextoBeneficio}>José I. Sierra 330, Metán.</p>
              </div>
            </div>

            {/* BOTONES */}
            <div style={{ padding: "40px", backgroundColor: "#fff1f2", borderRadius: "25px", border: "1px solid #fce7f3", display: "flex", flexDirection: "column", alignItems: "center", gap: "25px" }}>
              <Link href="/reservar" className="pulse-button" style={estiloBotonPrincipal}>📅 Reservar Turno</Link>
              <a href="https://www.instagram.com/dra_anni/" target="_blank" style={{ color: "#db2777", fontWeight: "bold", textDecoration: "none", fontSize: "1.1rem" }}>Seguime en Instagram 📸</a>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: AVISO REPROGRAMACIÓN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ padding: "20px", borderRadius: "20px", border: "2px dashed #db2777", backgroundColor: "#fff1f2", boxShadow: "0 4px 15px rgba(219, 39, 119, 0.1)" }}>
            <h3 style={{ color: "#db2777", marginBottom: "10px", fontSize: "1.1rem", fontWeight: "bold" }}>⚠️ AVISO IMPORTANTE </h3>
            <p style={{ color: "#db2777", fontSize: "0.9rem", fontWeight: "500", lineHeight: "1.5" }}>
              Ante mi labor medica, pueden surgir reprogramaciones de los turnos. Nos pondremos en contacto con vos mediante WhatsApp.
            </p>
          </div>

          <div style={{ padding: "20px", borderRadius: "20px", backgroundColor: "white", textAlign: "center", border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "0.9rem", color: "#4b5563", marginBottom: "10px" }}>¿Qué te pareció la web?</h3>
            <div style={{ fontSize: "1.8rem", cursor: "pointer", display: "flex", justifyContent: "center", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span key={num} onClick={() => handleStarClick(num)} style={{ color: rating >= num ? "#fbbf24" : "#d1d5db" }}>★</span>
              ))}
            </div>
            {showThanks && (
              <div style={{ marginTop: "10px", animation: "fadeIn 0.5s" }}>
                <p style={{ fontSize: "0.8rem", color: "#059669", fontWeight: "bold", margin: 0 }}>¡Gracias por valorarnos!</p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>Tu opinión nos permite mejorar.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer style={{ marginTop: "40px", textAlign: "center" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "0 0 5px 0" }}>© 2026 Consultorios Santa Sofía. Todos los derechos reservados.</p>
        <p style={{ color: "#9ca3af" , fontSize: "0.85rem", fontWeight: "bold", margin: 0 }}>Web desarrollada por Elias Cañete</p>
      </footer>

      <style jsx>{`
        .obra-social-btn { transition: all 0.2s; cursor: pointer; }
        .obra-social-btn:active { transform: scale(0.9); }
        .obra-social-btn:hover { transform: scale(1.1); background-color: #db2777 !important; color: white !important; }
        .pulse-button { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

const estiloBeneficio = { textAlign: "center" as const, padding: "20px", backgroundColor: "#fff1f2", borderRadius: "20px", border: "2px solid #fce7f3" };
const estiloIcono = { fontSize: "2.5rem", marginBottom: "10px" };
const estiloTituloBeneficio = { color: "#db2777", marginBottom: "8px", fontSize: "1.1rem", fontWeight: "bold" as const };
const estiloTextoBeneficio = { color: "#666", fontSize: "0.9rem", lineHeight: "1.4" };
const estiloTagInteractiva = { padding: "6px 12px", backgroundColor: "white", borderRadius: "10px", fontSize: "0.8rem", color: "#db2777", border: "1px solid #fce7f3", fontWeight: "600", outline: "none" } as any;
const estiloBotonPrincipal = { padding: "20px 60px", fontSize: "1.4rem", backgroundColor: "#db2777", color: "white", borderRadius: "50px", fontWeight: "bold", textDecoration: "none", boxShadow: "0 10px 25px rgba(219, 39, 119, 0.3)", textAlign: "center" as const };