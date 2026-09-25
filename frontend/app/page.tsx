"use client";
import Link from "next/link";

export default function Home() {
  const obrasSociales = [
    "Avalian", "Unión Personal", "Boreal", "Bramed", "Galeno", "IPSS", 
    "Jerárquicos Salud", "OSDE", "OSFATLYF", "Swiss Medical", "OSPE", 
    "Sancor Salud", "Medifé", "Visitar", "Medical Group", "Mep Life", "y más..."
  ];

  return (
    <div style={{ padding: "20px 15px", minHeight: "100vh", backgroundColor: "#fff5f7" }}>
      <div className="main-layout">
        
        {/* COLUMNA PRINCIPAL */}
        <main className="box-main">
          <div style={estiloColumnaBlanca}>
            
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
                    Médica Pediatra • MP 7327 🩺
                  </p>
                  
                  <Link href="/reservar" className="hero-cta-btn">
                    📅 Sacar Turno Online
                  </Link>
                </div>
              </div>
            </header>

            <div style={{ padding: "35px 30px" }}>
              
              {/* TEXTO DE BIENVENIDA */}
              <div style={{ textAlign: "center", color: "#4b5563", marginBottom: "30px", lineHeight: "1.7", fontSize: "1.02rem" }}>
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

              {/* BLOQUE: HORARIOS HABITUALES */}
              <div style={{
                backgroundColor: "#fff1f2",
                border: "1px solid #fce7f3",
                borderRadius: "18px",
                padding: "16px 20px",
                marginBottom: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ backgroundColor: "#db2777", color: "white", borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>
                    🕒
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", color: "#831843", fontSize: "0.95rem" }}>Horarios de Atención habituales</div>
                    <div style={{ color: "#9d174d", fontSize: "0.85rem" }}>Lunes a Viernes de 17:00 a 19:00 hs</div>
                  </div>
                </div>
                <span style={{ backgroundColor: "white", color: "#db2777", padding: "6px 14px", borderRadius: "50px", fontSize: "0.8rem", fontWeight: "700", border: "1px solid #fce7f3" }}>
                  Atención con Turno Previo
                </span>
              </div>

              {/* BLOQUE: CÓMO FUNCIONA LA RESERVA EN 3 PASOS */}
              <div style={{ marginBottom: "35px" }}>
                <h3 style={{ textAlign: "center", color: "#1f2937", fontSize: "1.15rem", fontWeight: "700", marginBottom: "20px" }}>
                  ¿Cómo reservar tu turno?
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
                  <div style={tarjetaPasoProceso}>
                    <span style={circuloNumeroPaso}>1</span>
                    <strong style={{ color: "#1f2937", fontSize: "0.92rem", marginBottom: "4px" }}>Elegí el servicio</strong>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280", lineHeight: "1.4" }}>
                      Seleccioná consulta o apto médico y tu día u horario disponible.
                    </p>
                  </div>

                  <div style={tarjetaPasoProceso}>
                    <span style={circuloNumeroPaso}>2</span>
                    <strong style={{ color: "#1f2937", fontSize: "0.92rem", marginBottom: "4px" }}>Datos del paciente</strong>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280", lineHeight: "1.4" }}>
                      Ingresá los datos del niño y motivo de la consulta.
                    </p>
                  </div>

                  <div style={tarjetaPasoProceso}>
                    <span style={circuloNumeroPaso}>3</span>
                    <strong style={{ color: "#1f2937", fontSize: "0.92rem", marginBottom: "4px" }}>Confirmación y Seña</strong>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#6b7280", lineHeight: "1.4" }}>
                      Abonás la seña online con Mercado Pago y asegurás tu turno.
                    </p>
                  </div>
                </div>
              </div>

              {/* ACCIÓN PRINCIPAL DE RESERVA */}
              <div style={{ padding: "30px 20px", backgroundColor: "#fff1f2", borderRadius: "22px", border: "1px solid #fce7f3", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link href="/reservar" className="pulse-button" style={estiloBotonPrincipal}>📅 Reservar Turno</Link>
              </div>

              {/* CONVENIOS */}
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

        {/* FRANJA SECUNDARIA LATERAL (Unificada con el mismo estilo de la principal) */}
        <aside className="box-sidebar">
          <div style={{ ...estiloColumnaBlanca, padding: "26px 22px", display: "flex", flexDirection: "column", gap: "22px" }}>
            
            {/* 1. AVISO INSTITUCIONAL INTEGRADO */}
            <div style={{
              backgroundColor: "#fff1f2",
              borderRadius: "16px",
              padding: "16px 18px",
              border: "1px solid #fce7f3"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <span style={{ fontSize: "1rem" }}>🩺</span>
                <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#be185d", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  Aviso de Atención
                </span>
              </div>
              <p style={{ margin: 0, color: "#9d174d", fontSize: "0.84rem", lineHeight: "1.5" }}>
                Ante emergencias o guardias médicas hospitalarias, los turnos pueden sufrir reprogramaciones. Nos comunicaremos directamente por WhatsApp.
              </p>
            </div>

            {/* 2. BENEFICIOS DEL CONSULTORIO (Arriba de los contactos) */}
            <div>
              <h3 style={estiloTituloSeccionLateral}>¿Por qué elegirnos?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={estiloBeneficioLateral}>
                  <span style={{ fontSize: "1.3rem" }}>⚡</span>
                  <div>
                    <strong style={{ color: "#db2777", fontSize: "0.88rem", display: "block" }}>Sin Esperas</strong>
                    <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>Turnos organizados y exactos.</span>
                  </div>
                </div>

                <div style={estiloBeneficioLateral}>
                  <span style={{ fontSize: "1.3rem" }}>🧸</span>
                  <div>
                    <strong style={{ color: "#db2777", fontSize: "0.88rem", display: "block" }}>Atención Cálida</strong>
                    <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>Espacio pensado para niños.</span>
                  </div>
                </div>

                <div style={estiloBeneficioLateral}>
                  <span style={{ fontSize: "1.3rem" }}>🏥</span>
                  <div>
                    <strong style={{ color: "#db2777", fontSize: "0.88rem", display: "block" }}>Obras Sociales</strong>
                    <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>Múltiples convenios vigentes.</span>
                  </div>
                </div>

                <div style={estiloBeneficioLateral}>
                  <span style={{ fontSize: "1.3rem" }}>📍</span>
                  <div>
                    <strong style={{ color: "#db2777", fontSize: "0.88rem", display: "block" }}>Ubicación Céntrica</strong>
                    <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>José I. Sierra 330, Metán.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. CANALES DE CONTACTO (Al pie de la franja) */}
            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "18px" }}>
              <h3 style={estiloTituloSeccionLateral}>Canales de Contacto</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                
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
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    backgroundColor: "#fdf2f8",
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid #fce7f3",
                    transition: "all 0.2s"
                  }}
                >
                  <span>📸</span> Seguime en Instagram
                </a>

                <a 
                  href="https://wa.me/5493876405797?text=¡Hola%20Dra.%20Ana%20Belén!%20Me%20contacto%20desde%20la%20web%20por%20una%20consulta." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="whatsapp-btn"
                  style={{ 
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    color: "#15803d", 
                    fontWeight: "600", 
                    textDecoration: "none", 
                    fontSize: "0.88rem",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    backgroundColor: "#f0fdf4",
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid #bbf7d0",
                    transition: "all 0.2s"
                  }}
                >
                  <svg width="18" height="18" fill="#16a34a" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Escribinos por WhatsApp
                </a>

              </div>
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
          grid-template-columns: 1fr 320px;
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

        .instagram-btn:hover {
          background-color: #fce7f3 !important;
          transform: translateY(-1px);
        }

        .whatsapp-btn:hover {
          background-color: #dcfce7 !important;
          transform: translateY(-1px);
        }

        @media (max-width: 950px) {
          .main-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 650px) {
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
      `}</style>
    </div>
  );
}

const estiloColumnaBlanca = {
  backgroundColor: "white",
  borderRadius: "28px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(219, 39, 119, 0.08)",
  border: "1px solid #fce7f3"
};

const estiloTituloSeccionLateral = {
  fontSize: "0.88rem",
  color: "#374151",
  margin: "0 0 12px 0",
  fontWeight: "700" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px"
};

const estiloBeneficioLateral = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  backgroundColor: "#fdf2f8",
  borderRadius: "14px",
  border: "1px solid #fce7f3"
};

const tarjetaPasoProceso = {
  backgroundColor: "#f9fafb",
  padding: "18px",
  borderRadius: "16px",
  border: "1px solid #f3f4f6",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start" as const
};

const circuloNumeroPaso = {
  backgroundColor: "#db2777",
  color: "white",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8rem",
  fontWeight: "bold" as const,
  marginBottom: "10px"
};

const estiloBadgeInformativo = { padding: "6px 12px", backgroundColor: "#fff", borderRadius: "20px", fontSize: "0.8rem", color: "#6b7280", fontWeight: "500", border: "1px solid #f3e8ff", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" } as any;
const estiloBotonPrincipal = { padding: "16px 36px", fontSize: "1.2rem", backgroundColor: "#db2777", color: "white", borderRadius: "50px", fontWeight: "bold", textDecoration: "none", textAlign: "center" as const, boxShadow: "0 8px 20px rgba(219, 39, 119, 0.3)" };