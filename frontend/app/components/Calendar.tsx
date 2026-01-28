"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; // Importamos la conexión
import { collection, getDocs } from "firebase/firestore"; // Funciones para leer

// 👇 TUS HORARIOS EXACTOS
const HORARIOS = [
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45"
];

// 👇 FUNCIÓN INTELIGENTE: Genera los próximos días reales (Martes a Viernes)
const generarDiasReales = () => {
  const diasGenerados = [];
  const hoy = new Date();
  
  // Buscamos en los próximos 14 días
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    
    // 0=Domingo, 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado
    const diaSemana = fecha.getDay();

    // Solo queremos Martes (2), Miércoles (3), Jueves (4) y Viernes (5)
    if (diaSemana >= 2 && diaSemana <= 5) {
      // Formato bonito: "Martes 30"
      const nombreDia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
      const numeroDia = fecha.getDate();
      const etiqueta = `${nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)} ${numeroDia}`; // "Martes 30"
      
      // Valor único para guardar: "2026-01-30"
      const valor = fecha.toISOString().split("T")[0]; 
      
      diasGenerados.push({ etiqueta, valor });
    }
  }
  return diasGenerados;
};

interface CalendarProps {
  selectedDia: string | null;
  selectedHora: string | null;
  onSelectDia: (dia: string) => void;
  onSelectHora: (hora: string) => void;
}

export default function Calendar({
  selectedDia,
  selectedHora,
  onSelectDia,
  onSelectHora,
}: CalendarProps) {
  
  const [diasDisponibles] = useState(generarDiasReales());
  const [ocupados, setOcupados] = useState<string[]>([]);

  // 👇 EFECTO: Lee Firebase y busca qué turnos están ocupados
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turnos"));
        const listaOcupados: string[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Guardamos "2026-01-30_17:00"
          listaOcupados.push(`${data.dia}_${data.hora}`);
        });
        
        setOcupados(listaOcupados);
      } catch (error) {
        console.error("Error al conectar con Firebase:", error);
      }
    };
    cargarTurnos();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      
      {/* SECCIÓN DÍAS */}
      <div>
        <h3 style={{ marginBottom: 15, fontSize: "1.1rem", color: "#444" }}>Seleccioná un día:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {diasDisponibles.map((diaObj) => {
            const isSelected = selectedDia === diaObj.valor;
            return (
              <button
                key={diaObj.valor}
                onClick={() => onSelectDia(diaObj.valor)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: isSelected ? "1px solid #009ee3" : "1px solid #ddd",
                  cursor: "pointer",
                  // TU ESTILO: Azul si está seleccionado
                  backgroundColor: isSelected ? "#009ee3" : "#fff",
                  color: isSelected ? "#fff" : "#555",
                  fontWeight: isSelected ? "bold" : "normal",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 8px rgba(0,158,227,0.2)" : "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                {diaObj.etiqueta}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN HORARIOS */}
      {selectedDia && (
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          <h3 style={{ marginBottom: 15, fontSize: "1.1rem", color: "#444" }}>
            Horarios disponibles:
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "12px" }}>
            {HORARIOS.map((hora) => {
              // 👇 LÓGICA DE BLOQUEO
              const identificador = `${selectedDia}_${hora}`;
              const estaOcupado = ocupados.includes(identificador);
              const isSelected = selectedHora === hora;

              return (
                <button
                  key={hora}
                  onClick={() => !estaOcupado && onSelectHora(hora)}
                  disabled={estaOcupado} // Desactiva el botón si está ocupado
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    // Si está ocupado: Gris y tachado
                    // Si está seleccionado: Verde (Tu estilo)
                    // Si está libre: Blanco
                    border: estaOcupado ? "1px solid #e5e7eb" : isSelected ? "1px solid #28a745" : "1px solid #ddd",
                    backgroundColor: estaOcupado ? "#f3f4f6" : isSelected ? "#28a745" : "#fff",
                    color: estaOcupado ? "#9ca3af" : isSelected ? "#fff" : "#555",
                    fontWeight: isSelected ? "bold" : "normal",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                    textDecoration: estaOcupado ? "line-through" : "none",
                    cursor: estaOcupado ? "not-allowed" : "pointer",
                    boxShadow: isSelected ? "0 4px 8px rgba(40,167,69,0.2)" : "0 2px 4px rgba(0,0,0,0.05)"
                  }}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}