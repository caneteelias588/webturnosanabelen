"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const imagenes = ["/perfil.jpg", "/perfil1.jpg", "/perfil2.jpg"];
  const [imagenActual, setImagenActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % imagenes.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div style={{ padding: "40px 20px", minHeight: "calc(100vh - 100px)" }}>
      
      {/* TARJETA PRINCIPAL */}
      <div style={{ maxWidth: "900px", margin: "0 auto", backgroundColor: "white", borderRadius: "30px", overflow: "hidden", boxShadow: "0 10px 40px rgba(219, 39, 119, 0.1)" }}>
        
        {/* ENCABEZADO MÁS CHICO 👇 */}
        <header style={{ background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", padding: "30px 20px", color: "white", textAlign: "center" }}>
          {/* FOTO MÁS CHICA (110px) */}
          <img src="/perfil.jpg" alt="Dra. Ana" style={{ width: "110px", height: "110px", borderRadius: "50%", border: "5px solid rgba(255,255,255,0.3)", objectFit: "cover", marginBottom: "15px" }} />
          {/* TÍTULO MÁS CHICO (2rem) */}
          <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: "bold" }}>Dra. Ana Belén</h1>
          {/* SUBTÍTULO MÁS CHICO (1.1rem) */}
          <p style={{ margin: "8px 0 0 0", fontSize: "1.1rem", opacity: 0.9 }}>Médica • MP 7327 🩺</p>
        </header>

        <div style={{ padding: "40px 30px" }}>
          
          {/* TEXTO DE BIENVENIDA */}
          <div style={{ textAlign: "center", color: "#374151", marginBottom: "40px", lineHeight: "1.6", fontSize: "1.1rem", maxWidth: "750px", margin: "0 auto 40px auto" }}>
            <p style={{ marginBottom: "15px", fontWeight: "bold", color: "#db2777" }}>
              ¡Hola! Bienvenidos a mi consultorio digital. Aquí podrán reservar turnos de forma rápida y sencilla.
            </p>
            <p style={{ marginBottom: "15px" }}>
              En mi consultorio médico ofrezco atención integral a niños y adolescentes, abarcando desde consultas de rutina hasta tratamientos especializados.
            </p>
            <p style={{ fontStyle: "italic", color: "#555" }}>
              "Acompañemos el crecimiento de los niños con una atención amorosa, respetuosa y dedicada, cuidando su salud y la tranquilidad de la familia."
            </p>
          </div>

          {/* BENEFICIOS (ICONOS) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "50px" }}>
            
            <div style={estiloBeneficio}>
              <div style={estiloIcono}>⚡</div>
              <h3 style={estiloTituloBeneficio}>Sin Esperas</h3>
              <p style={estiloTextoBeneficio}>Sistema de turnos exactos para respetar tu tiempo.</p>
            </div>

            <div style={estiloBeneficio}>
              <div style={estiloIcono}>🧸</div>
              <h3 style={estiloTituloBeneficio}>Atención Cálida</h3>
              <p style={estiloTextoBeneficio}>Un espacio pensado para que los chicos se sientan cómodos.</p>
            </div>

            <div style={estiloBeneficio}>
              <div style={estiloIcono}>🏥</div>
              <h3 style={estiloTituloBeneficio}>Obras Sociales</h3>
              <p style={estiloTextoBeneficio}>Trabajamos con múltiples coberturas médicas.</p>
            </div>

          </div>

          {/* BOTONES DE ACCIÓN */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            
            {/* Botón Principal: Reservar */}
            <Link href="/reservar" style={{ display: "inline-block", padding: "18px 50px", fontSize: "1.3rem", backgroundColor: "#db2777", color: "white", borderRadius: "50px", fontWeight: "bold", textDecoration: "none", boxShadow: "0 8px 20px rgba(219, 39, 119, 0.3)", transition: "transform 0.2s" }}>
              📅 Sacar un Turno Ahora
            </Link>

            {/* Botón Secundario: Instagram */}
            <a 
              href="https://www.instagram.com/dra_anni/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 25px", fontSize: "1.1rem", color: "#db2777", border: "2px solid #db2777", borderRadius: "50px", textDecoration: "none", fontWeight: "bold", background: "white", cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#fff1f2"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "white"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#db2777"/>
              </svg>
              Seguime en Instagram
            </a>

          </div>

        </div>
      </div>

       {/* BOTÓN FLOTANTE WHATSAPP */}
       <a href="https://wa.me/5493876405797" target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "25px", right: "25px", backgroundColor: "#25D366", width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 6px 20px rgba(0,0,0,0.3)", zIndex: 100 }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style={{ width: "35px", height: "35px" }} />
      </a>
    </div>
  );
}

// ESTILOS
const estiloBeneficio = {
  textAlign: "center" as const,
  padding: "20px",
  backgroundColor: "#fff1f2", 
  borderRadius: "20px",
  border: "2px solid #fce7f3"
};

const estiloIcono = { fontSize: "2.5rem", marginBottom: "10px" };
const estiloTituloBeneficio = { color: "#db2777", marginBottom: "8px", fontSize: "1.1rem" };
const estiloTextoBeneficio = { color: "#666", fontSize: "0.95rem", lineHeight: "1.4" };