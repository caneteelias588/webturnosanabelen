import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const varela = Varela_Round({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Turnos Dra. Ana Belén",
  description: "Reserva de turnos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={varela.className} style={{ backgroundColor: "#fdf2f8", margin: 0, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* BARRA DE NAVEGACIÓN */}
        <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", backgroundColor: "white", zIndex: 1000, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", padding: "15px 20px", boxSizing: "border-box" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <img src="/perfil3.jpg" alt="Logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
              <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#db2777" }}>Dra. Ana Belén</span>
            </Link>
            <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
              <Link href="/" style={estiloLinkNav}>Inicio</Link>
              <Link href="/reservar" style={estiloLinkNav}>Reservar</Link>
              <Link href="/ubicacion" style={estiloLinkNav}>Ubicación</Link>
              <Link href="/preguntas" style={estiloLinkNav}>Preguntas</Link>
            </div>
          </div>
        </nav>

        {/* CONTENIDO PRINCIPAL (Empuja el footer hacia abajo) */}
        <div style={{ paddingTop: "100px", flex: "1" }}>
          {children}
        </div>

        {/* 👇 NUEVO FOOTER (PIE DE PÁGINA) 👇 */}
        <footer style={{ backgroundColor: "white", padding: "40px 20px", marginTop: "60px", borderTop: "5px solid #fce7f3" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            
            <h3 style={{ color: "#db2777", fontSize: "1.5rem", marginBottom: "10px" }}>Dra. Ana Belén</h3>
            <p style={{ color: "#666", marginBottom: "30px" }}>Cuidando la salud de los más pequeños con amor y dedicación.</p>
            
            <div style={{ display: "flex", justifyContent: "center", gap: "30px", marginBottom: "30px", flexWrap: "wrap" }}>
              <Link href="/reservar" style={{ textDecoration: "none", color: "#555", fontWeight: "bold" }}>Sacar Turno</Link>
              <Link href="/ubicacion" style={{ textDecoration: "none", color: "#555", fontWeight: "bold" }}>Cómo Llegar</Link>
              <Link href="/preguntas" style={{ textDecoration: "none", color: "#555", fontWeight: "bold" }}>Preguntas Frecuentes</Link>
            </div>

            <p style={{ fontSize: "0.9rem", color: "#999" }}>
              &copy; {new Date().getFullYear()} Consultorios Santa Sofía. Todos los derechos reservados.
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}

const estiloLinkNav = {
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#555",
  transition: "color 0.2s"
};