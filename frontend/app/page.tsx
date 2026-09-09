"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [showThanks, setShowThanks] = useState(false);

  const obrasSociales = [
    "Avalian", "Unión Personal", "Boreal", "Bramed", "Galeno", "IPSS", 
    "Jerárquicos Salud", "OSDE", "OSFATLYF", "Swiss Medical", "OSPE", 
    "Sancor Salud", "Medifé", "Visitar", "Medical Group", "Mep Life", "y más..."
  ];

  const handleStarClick = (num: number) => {
    setRating(num);
    if (num === 5) setShowThanks(true);
  };

  return (
    <div style={{ padding: "20px 15px", minHeight: "100vh", backgroundColor: "#fff5f7" }}>
      <div className="main-layout">
        
        {/* COLUMNA PRINCIPAL */}
        <main className="box-main">
          <div style={{ backgroundColor: "white", borderRadius: "28px", overflow: "hidden", boxShadow: "0 10px 30px rgba(219, 39, 119, 0.1)" }}>
            
            {/* CABECERA CON FONDO PEDIATRA + ACCIÓN RÁPIDA */}
            <header className="hero-header">
              <div className="hero-content">
                <div className="hero-avatar">
                  <img src="/perfil.jpg" alt="Dra. Ana Belén" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="hero-text">
                  <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                    Dra. Ana Belén
                  </h1>
                  <p style={{ margin: "4px 0 14px 0", fontSize: "1.05rem", opacity: 0.95, fontWeight: "500", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                    Médica • MP 7327 🩺
                  </p>
                  
                  {/* Botón de acción directa arriba */}
                  <Link href="/reservar" className="hero-cta-btn">
                    📅 Sacar Turno Online
                  </Link>
                </div>
              </div>
            </header>

            <div style={{ padding: "35px 30px" }}>
              
              {/* TEXTO DE BIENVENIDA MÁS COMPACTO Y ELEGANTE */}
              <div style={{ textAlign: "center", color: "#4b5563", marginBottom: "35px", lineHeight: "1.7", fontSize: "1.02rem" }}>
                <p style={{ marginBottom: "14px", fontWeight: "700", color: "#db2777", fontSize: "1.15rem" }}>
                  ¡Hola! Bienvenidos a mi consultorio digital. Aquí podrán reservar turnos de forma rápida y sencilla.
                </p>
                <p style={{ marginBottom: "16px", maxWidth: "680px", margin: "0 auto 16px auto" }}>
                  En mi consultorio médico ofrezco atención integral a niños y adolescentes, abarcando desde consultas de rutina hasta tratamientos especializados.
                </p>
                <div style={{
                  backgroundColor: "#fdf2f8",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  borderLeft: "4px solid #db2777",
                  fontStyle: "italic",
                  color: "#6b7280",
                  maxWidth: "650px",
                  margin: "15px auto 0 auto",
                  fontSize: "0.95rem"
                }}>
                  "Acompañemos el crecimiento de los niños con una atención amorosa, respetuosa y dedicada, cuidando su salud y la tranquilidad de la familia."
                </div>
              </div>

              {/* GRILLA DE BENEFICIOS */}
              <div className="benefits-grid">
                <div style={estiloBeneficio}><div style={estiloIcono}>⚡</div><h3 style={estiloTituloBeneficio}>Sin Esperas</h3><p style={estiloTextoBeneficio}>Turnos exactos.</p></div>
                <div style={estiloBeneficio}><div style={estiloIcono}>🧸</div><h3 style={estiloTituloBeneficio}>Atención Cálida</h3><p style={estiloTextoBeneficio}>Espacio para niños.</p></div>
                <div style={estiloBeneficio}><div style={estiloIcono}>🏥</div><h3 style={estiloTituloBeneficio}>Obras Sociales</h3><p style={estiloTextoBeneficio}>Múltiples coberturas.</p></div>
                <div style={estiloBeneficio}><div style={estiloIcono}>📍</div><h3 style={estiloTituloBeneficio}>Ubicación</h3><p style={estiloTextoBeneficio}>José I. Sierra 330.</p></div>
              </div>

              {/* ACCIÓN PRINCIPAL INFERIOR (100% ENFOCADO EN RESERVAR) */}
              <div style={{ padding: "30px 20px", backgroundColor: "#fff1f2", borderRadius: "22px", border: "1px solid #fce7f3", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="/reservar" className="pulse-button" style={estiloBotonPrincipal}>📅 Reservar Turno</Link>
              </div>

              {/* SECCIÓN DE CONVENIOS REUBICADA DE FORMA INFORMATIVA */}
              <div style={{ marginTop: "40px", borderTop: "1px solid #fce7f3", paddingTop: "25px" }}>
                <h4 style={{ color: "#9ca3af", textAlign: "center", marginBottom: "16px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold" }}>
                  Obras Sociales y Prepagas que atendemos
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                  {obrasSociales.map((os, i) => (
                    <span key={i} style={estiloBadgeInformativo}>{os}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* BARRA LATERAL DERECHA (Avisos, valoración y redes sociales) */}
        <aside className="box-sidebar">
          {/* AVISO REPROGRAMACIÓN */}
          <div style={{ padding: "20px", borderRadius: "20px", border: "2px dashed #f472b6", backgroundColor: "#fff1f2", marginBottom: "20px" }}>
            <h3 style={{ color: "#be185d", marginBottom: "8px", fontSize: "0.95rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>⚠️</span> AVISO IMPORTANTE
            </h3>
            <p style={{ color: "#9d174d", fontSize: "0.85rem", lineHeight: "1.5", margin: 0 }}>
              Ante mi labor médica, pueden surgir reprogramaciones de los turnos. Nos pondremos en contacto con vos mediante WhatsApp.
            </p>
          </div>

          {/* CALIFICACIÓN + INSTAGRAM */}
          <div style={{ padding: "20px", borderRadius: "20px", backgroundColor: "white", textAlign: "center", border: "1px solid #fce7f3", boxShadow: "0 4px 15px rgba(219, 39, 119, 0.04)" }}>
            <h3 style={{ fontSize: "0.88rem", color: "#6b7280", marginBottom: "8px" }}>¿Qué te pareció la web?</h3>
            <div style={{ fontSize: "1.7rem", cursor: "pointer", display: "flex", justifyContent: "center", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <span key={num} onClick={() => handleStarClick(num)} style={{ color: rating >= num ? "#fbbf24" : "#e5e7eb", transition: "color 0.2s" }}>★</span>
              ))}
            </div>
            {showThanks && (
              <div style={{ marginTop: "10px", animation: "fadeIn 0.5s" }}>
                <p style={{ fontSize: "0.8rem", color: "#059669", fontWeight: "bold", margin: 0 }}>
                  ¡Gracias por valorarnos! Tu opinión nos permite mejorar.
                </p>
              </div>
            )}

            {/* SEPARADOR E INSTAGRAM */}
            <div style={{ borderTop: "1px solid #fce7f3", marginTop: "16px", paddingTop: "14px" }}>
              <a 
                href="https://www.instagram.com/dra_anni/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="instagram-btn"
                style={{ 
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "#db2777", 
                  fontWeight: "600", 
                  textDecoration: "none", 
                  fontSize: "0.9rem",
                  padding: "10px 14px",
                  borderRadius: "14px",
                  backgroundColor: "#fdf2f8",
                  width: "100%",
                  boxSizing: "border-box",
                  border: "1px solid #fce7f3",
                  transition: "all 0.2s"
                }}
              >
                <span>📸</span> Seguime en Instagram
              </a>
            </div>
          </div>
        </aside>

      </div>

      <footer style={{ marginTop: "40px", textAlign: "center" }}>
        <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "0 0 5px 0" }}>© 2026 Consultorios Santa Sofía. Todos los derechos reservados.</p>
        <p style={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: "bold", margin: 0 }}>Web desarrollada por Elias Cañete</p>
      </footer>

      <style jsx>{`
        .main-layout {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 25px;
          align-items: start;
        }

        .hero-header {
          min-height: 230px;
          padding: 30px 35px;
          display: flex;
          align-items: center;
          color: white;
          background: 
            linear-gradient(90deg, rgba(219, 39, 119, 0.95) 0%, rgba(236, 72, 153, 0.85) 45%, rgba(236, 72, 153, 0.3) 78%, rgba(236, 72, 153, 0.05) 100%),
            url('/pediatra-fondo.webp') right center / cover no-repeat;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 22px;
          text-align: left;
        }

        .hero-avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 4px solid #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.18);
          flex-shrink: 0;
          background-color: white;
        }

        .hero-cta-btn {
          display: inline-block;
          padding: 8px 18px;
          background-color: #ffffff;
          color: #db2777;
          border-radius: 50px;
          font-weight: bold;
          font-size: 0.92rem;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hero-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 35px;
        }

        .instagram-btn:hover {
          background-color: #fce7f3 !important;
          transform: translateY(-1px);
        }

        @media (max-width: 950px) {
          .main-layout {
            grid-template-columns: 1fr;
          }
          .box-sidebar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
        }

        @media (max-width: 650px) {
          .box-sidebar {
            grid-template-columns: 1fr;
          }
          .benefits-grid {
            grid-template-columns: 1fr;
          }
          .hero-header {
            padding: 30px 20px;
            min-height: auto;
            background: 
              linear-gradient(180deg, rgba(219, 39, 119, 0.94) 0%, rgba(236, 72, 153, 0.85) 65%, rgba(236, 72, 153, 0.45) 100%),
              url('/pediatra-fondo.webp') center / cover no-repeat;
          }
          .hero-content {
            flex-direction: column;
            text-align: center;
            width: 100%;
            gap: 12px;
          }
        }

        .pulse-button { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

const estiloBeneficio = { textAlign: "center" as const, padding: "16px", backgroundColor: "#fff1f2", borderRadius: "18px", border: "1px solid #fce7f3" };
const estiloIcono = { fontSize: "1.8rem", marginBottom: "6px" };
const estiloTituloBeneficio = { color: "#db2777", marginBottom: "4px", fontSize: "0.95rem", fontWeight: "bold" as const };
const estiloTextoBeneficio = { color: "#6b7280", fontSize: "0.82rem", lineHeight: "1.3" };
const estiloBadgeInformativo = { padding: "6px 12px", backgroundColor: "#fff", borderRadius: "20px", fontSize: "0.8rem", color: "#6b7280", fontWeight: "500", border: "1px solid #f3e8ff", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" } as any;
const estiloBotonPrincipal = { padding: "16px 36px", fontSize: "1.2rem", backgroundColor: "#db2777", color: "white", borderRadius: "50px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, boxShadow: "0 8px 20px rgba(219, 39, 119, 0.3)" };