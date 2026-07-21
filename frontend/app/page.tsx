"use client";

import React from "react";

export default function HomePage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#fdf2f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        maxWidth: "600px",
        backgroundColor: "white",
        padding: "50px 30px",
        borderRadius: "30px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        border: "3px solid #fce7f3"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🏖️☀️</div>
        <h1 style={{ color: "#db2777", marginBottom: "15px", fontSize: "2rem" }}>
          Cerrado por Vacaciones
        </h1>
        <p style={{ color: "#4b5563", fontSize: "1.2rem", lineHeight: "1.6", marginBottom: "25px" }}>
          El consultorio de la Dra. Ana Belén permanecerá cerrado por receso vacacional.
        </p>
        <div style={{
          backgroundColor: "#fff1f2",
          padding: "15px",
          borderRadius: "15px",
          color: "#be185d",
          fontWeight: "bold",
          fontSize: "1.1rem"
        }}>
          📅 La agenda online se habilitará nuevamente a la brevedad.
        </div>
      </div>
    </div>
  );
}