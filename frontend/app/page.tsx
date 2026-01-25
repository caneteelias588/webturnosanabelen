"use client";

import { useState, useEffect } from "react";
import Calendar from "./components/Calendar";

export default function Home() {
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);
  const [tipo, setTipo] = useState<"particular" | "obra_social" | null>(null);

  // 📸 CARRUSEL DE FOTOS
  const fotosCarrusel = ["/perfil2.jpg", "/perfil1.jpg", "/perfil.jpg"];
  const [indiceFoto, setIndiceFoto] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFoto((prevIndex) => (prevIndex + 1) % fotosCarrusel.length);
    }, 3500); 
    return () => clearInterval(intervalo);
  }, [fotosCarrusel.length]);

  // 📞 TU NÚMERO DE WHATSAPP (Formato para el link: sin + y sin espacios)
  const TELEFONO_WHATSAPP = "543876405797"; 

  // Precios
  const precioTotal = tipo === "particular" ? 22000 : tipo === "obra_social" ? 18000 : 0;
  const senia = precioTotal / 2;

  const scrollearAturnos = () => {
    const seccionTurnos = document.getElementById("seccion-turnos");
    if (seccionTurnos) {
      seccionTurnos.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDiaChange = (nuevoDia: string) => {
    setDia(nuevoDia);
    setHora(null);
  };

  async function pagarSenia() {
    if (!dia || !hora || !tipo) {
      alert("Por favor, completá todos los datos del turno 🌸");
      return;
    }
    try {
      const res = await fetch("/api/pagar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ monto: senia }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error al iniciar pago");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  }

  return (
    <main style={{ 
      // 🎨 FONDO: Rosa muy clarito
      backgroundColor: "#fff0f5", 
      backgroundImage: "url('/fondos.jpg')", 
      backgroundRepeat: "repeat", 
      minHeight: "100vh", 
      padding: "40px 20px", 
      fontFamily: "'Quicksand', 'Nunito', sans-serif" 
    }}>
      {/* Importamos la fuente Quicksand */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap');
      `}</style>
      
      {/* Botón Flotante WhatsApp */}
      <a 
        href={`https://wa.me/${TELEFONO_WHATSAPP}?text=Hola Dra. Ana, quisiera realizar una consulta.`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: "30px", right: "30px",
          backgroundColor: "#25D366", color: "white",
          width: "65px", height: "65px", borderRadius: "50%",
          display: "flex", justifyContent: "center", alignItems: "center",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
          zIndex: 1000, textDecoration: "none", fontSize: "35px",
          border: "3px solid white"
        }}
        title="Enviar mensaje por WhatsApp"
      >
        💬
      </a>

      {/* ==================================================
          SECCIÓN 1: PRESENTACIÓN (BIO Y CARRUSEL) 
         ================================================== */}
      <section style={{ maxWidth: "850px", margin: "0 auto 40px auto", backgroundColor: "#ffffff", borderRadius: "30px", boxShadow: "0 20px 40px rgba(219, 39, 119, 0.1)", overflow: "hidden", border: "1px solid #fce7f3" }}>
        
        {/* Encabezado: Degradado Rosa/Frambuesa */}
        <div style={{ 
          background: "linear-gradient(135deg, #f472b6 0%, #be185d 100%)", 
          padding: "40px", color: "white", position: "relative" 
        }}>
          
          {/* Logo Esquina */}
          <div style={{ position: "absolute", top: "20px", right: "20px", width: "80px", height: "80px", borderRadius: "20px", backgroundColor: "white", padding: "5px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <img src="/perfil3.jpg" alt="Logo" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", gap: "25px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", border: "5px solid rgba(255,255,255,0.8)", backgroundColor: "#fff", flexShrink: 0, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
              <img src="/perfil.jpg" alt="Dra. Ana" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "2.2rem", fontWeight: "700" }}>Dra. Ana Belén</h1>
              <p style={{ margin: "5px 0 0 0", fontSize: "1.2rem", opacity: 0.95, fontWeight: "500" }}>Médica General 🩺</p>
            </div>
          </div>
        </div>

        {/* Cuerpo de la Presentación */}
        <div style={{ padding: "40px" }}>
          
          {/* 👇 DESCRIPCIÓN ACTUALIZADA */}
          <div style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "#4b5563", marginBottom: "35px", textAlign: "center", fontWeight: "500" }}>
            <p style={{ marginBottom: "15px" }}>
              En mi consultorio médico ofrezco atención integral a niños y adolescentes, abarcando desde consultas de rutina hasta tratamientos especializados.
            </p>
            <p>
              Acompañemos el crecimiento de los niños con una atención amorosa, respetuosa y dedicada, cuidando su salud y la tranquilidad de la familia.
            </p>
          </div>

          {/* Carrusel */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "35px" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "450px", height: "380px", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 25px rgba(219, 39, 119, 0.15)", border: "4px solid #fff" }}>
              <img 
                key={indiceFoto}
                src={fotosCarrusel[indiceFoto]} 
                alt="Fotos Dra" 
                style={{ width: "100%", height: "100%", objectFit: "cover", animation: "fadeIn 0.8s" }} 
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button 
              onClick={scrollearAturnos}
              style={{
                backgroundColor: "#db2777", // Rosa Frambuesa
                color: "white", border: "none", padding: "16px 45px",
                borderRadius: "50px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer",
                boxShadow: "0 8px 20px rgba(219, 39, 119, 0.4)", transition: "transform 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              👇 Reservar Turno Online
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECCIÓN 2: TURNOS Y PAGOS 
         ================================================== */}
      <section id="seccion-turnos" style={{ maxWidth: "850px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "30px", boxShadow: "0 15px 30px rgba(0,0,0,0.05)", overflow: "hidden", border: "1px solid #fce7f3" }}>
        
        <div style={{ padding: "30px", borderBottom: "1px solid #fce7f3", backgroundColor: "#fff5f8" }}>
          <h2 style={{ margin: 0, color: "#9d174d", textAlign: "center", fontSize: "1.6rem", fontWeight: "700" }}>📅 Agenda tu Cita</h2>
        </div>

        {/* Política */}
        <div style={{ backgroundColor: "#fff1f2", color: "#9f1239", padding: "15px 30px", display: "flex", gap: "10px", alignItems: "center", borderBottom: "1px solid #fecdd3" }}>
          <span style={{ fontSize: "1.4rem" }}>⚠️</span>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>
            <strong>Política:</strong> La seña no se reintegra sin aviso previo de 24hs.
          </p>
        </div>

        <div style={{ padding: "40px" }}>
          {/* PASO 1 */}
          <div style={{ marginBottom: "50px" }}>
            <h3 style={{ color: "#be185d", fontSize: "1.3rem", marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "700" }}>
              <span style={{ background: "#fbcfe8", color: "#831843", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: "1rem" }}>1</span>
              Elegí el día y la hora
            </h3>
            <Calendar selectedDia={dia} selectedHora={hora} onSelectDia={handleDiaChange} onSelectHora={setHora} />
          </div>

          {/* PASO 2 */}
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ color: "#be185d", fontSize: "1.3rem", marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px", fontWeight: "700" }}>
              <span style={{ background: "#fbcfe8", color: "#831843", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: "1rem" }}>2</span>
              Tipo de consulta
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 25px", border: tipo === "particular" ? "2px solid #db2777" : "2px solid #f3f4f6", borderRadius: "20px", cursor: "pointer", backgroundColor: tipo === "particular" ? "#fff1f2" : "white", transition: "all 0.2s", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <input type="radio" name="tipo" checked={tipo === "particular"} onChange={() => setTipo("particular")} style={{ transform: "scale(1.3)", accentColor: "#db2777" }} />
                  <span style={{ fontWeight: "700", color: "#374151", fontSize: "1.05rem" }}>Particular</span>
                </div>
                <span style={{ fontSize: "1.2rem", color: "#be185d", fontWeight: "800" }}>$22.000</span>
              </label>

              <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 25px", border: tipo === "obra_social" ? "2px solid #db2777" : "2px solid #f3f4f6", borderRadius: "20px", cursor: "pointer", backgroundColor: tipo === "obra_social" ? "#fff1f2" : "white", transition: "all 0.2s", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <input type="radio" name="tipo" checked={tipo === "obra_social"} onChange={() => setTipo("obra_social")} style={{ transform: "scale(1.3)", accentColor: "#db2777" }} />
                  <span style={{ fontWeight: "700", color: "#374151", fontSize: "1.05rem" }}>Obra Social</span>
                </div>
                <span style={{ fontSize: "1.2rem", color: "#be185d", fontWeight: "800" }}>$18.000</span>
              </label>
            </div>
          </div>
        </div>

        {/* RESUMEN FINAL */}
        <div style={{ backgroundColor: "#fdf2f8", padding: "35px", borderTop: "2px dashed #fbcfe8" }}>
          {!dia || !hora || !tipo ? (
            <p style={{ textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: "1rem" }}>
              👈 Completá los pasos para ver el total a pagar.
            </p>
          ) : (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", borderBottom: "1px solid #fbcfe8", paddingBottom: "20px" }}>
                <div><small style={{ color: "#be185d", fontWeight: "800", letterSpacing: "1px" }}>FECHA</small><p style={{ fontWeight: "800", fontSize: "1.3rem", margin: "5px 0", color: "#374151" }}>{dia} {hora}hs</p></div>
                <div style={{ textAlign: "right" }}><small style={{ color: "#be185d", fontWeight: "800", letterSpacing: "1px" }}>TOTAL</small><p style={{ fontWeight: "800", fontSize: "1.3rem", margin: "5px 0", color: "#374151" }}>${precioTotal.toLocaleString()}</p></div>
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#831843", fontSize: "1.1rem" }}>Seña a abonar ahora (50%):</p>
                <p style={{ fontSize: "2.5rem", color: "#db2777", margin: "5px 0 20px 0", fontWeight: "900" }}>${senia.toLocaleString()}</p>
                <button
                  onClick={pagarSenia}
                  style={{ backgroundColor: "#db2777", color: "white", border: "none", padding: "18px 60px", borderRadius: "50px", fontSize: "1.3rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 8px 25px rgba(219, 39, 119, 0.4)", transition: "transform 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  Pagar Seña ➜
                </button>
                <p style={{ marginTop: "15px", fontSize: "0.85rem", color: "#9ca3af" }}>🔒 Procesado por Mercado Pago</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: "50px", color: "#9ca3af", fontSize: "0.9rem" }}>
        <p>📍 José Ignacio Sierra 330, Consultorios Santa Sofía, Metán.</p>
        <p>© {new Date().getFullYear()} Dra. Ana Belén</p>
      </div>

    </main>
  );
}