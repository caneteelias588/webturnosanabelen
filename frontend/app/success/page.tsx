"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    const turno = JSON.parse(localStorage.getItem("turno") || "{}");

    if (!turno.fecha) return;

    fetch("/api/turnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(turno),
    }).then(() => {
      localStorage.removeItem("turno");
    });
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>✅ Pago confirmado</h1>
      <p>Tu turno fue reservado correctamente.</p>
    </main>
  );
}
