import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dra. Ana Belén - Turnos Online", // <-- Título de la pestaña del navegador
  description: "Reserva de turnos médicos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Barra superior simple (opcional) */}
        <nav style={{ padding: "20px", borderBottom: "1px solid #eee", backgroundColor: "white" }}>
          <div style={{ maxWidth: "850px", margin: "0 auto", fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}>
            Dra. Ana Belén
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}