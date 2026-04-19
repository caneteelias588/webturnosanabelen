"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore"; 

const HORARIOS = [
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45"
];

const generarDiasReales = () => {
  const diasGenerados = [];
  const hoy = new Date();
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    const diaSemana = fecha.getDay();
    if (diaSemana >= 1 && diaSemana <= 5) {
      const nombreDia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
      const numeroDia = fecha.getDate();
      const etiqueta = `${nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)} ${numeroDia}`; 
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      const valor = `${year}-${month}-${day}`; 
      diasGenerados.push({ etiqueta, valor });
    }
  }
  return diasGenerados;
};

interface CalendarProps {
  selectedDia: string | null;
  selectedHora: string | null;
  onSelectDia: (dia: string | null) => void;
  onSelectHora: (hora: string | null) => void;
}

export default function Calendar({ selectedDia, selectedHora, onSelectDia, onSelectHora }: CalendarProps) {
  const [diasDisponibles] = useState(generarDiasReales());
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [cargandoTurnos, setCargandoTurnos] = useState(true);
  const [diaCompleto, setDiaCompleto] = useState(false);

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turnos"));
        const listaOcupados: string[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // CAMBIO CLAVE: Usamos data.fecha para que coincida con la DB
          if (data.fecha && data.hora) {
            listaOcupados.push(`${data.fecha}_${data.hora}`);
          }
        });
        setOcupados(listaOcupados);
        setCargandoTurnos(false);
      } catch (error) {
        console.error("Error al conectar con Firebase:", error);
      }
    };
    cargarTurnos();
  }, []);

  useEffect(() => {
    if (selectedDia && !cargandoTurnos) {
      let horarioEncontrado = null;
      for (let hora of HORARIOS) {
        const identificador = `${selectedDia}_${hora}`;
        if (!ocupados.includes(identificador)) {
          horarioEncontrado = hora;
          break;
        }
      }
      if (horarioEncontrado) {
        setDiaCompleto(false);
        onSelectHora(horarioEncontrado);
      } else {
        setDiaCompleto(true);
        onSelectHora(null);
      }
    }
  }, [selectedDia, ocupados, cargandoTurnos, onSelectHora]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      <div>
        <h3 style={{ marginBottom: 15, fontSize: "1.1rem", color: "#444" }}>Seleccioná un día:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {diasDisponibles.map((diaObj) => {
            const isSelected = selectedDia === diaObj.valor;
            return (
              <button
                key={diaObj.valor}
                onClick={() => { onSelectDia(diaObj.valor); setDiaCompleto(false); }}
                style={{
                  padding: "10px 20px", borderRadius: "8px",
                  border: isSelected ? "2px solid #db2777" : "1px solid #ddd", 
                  cursor: "pointer", backgroundColor: isSelected ? "#fce7f3" : "#fff",
                  color: isSelected ? "#db2777" : "#555", fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {diaObj.etiqueta}
              </button>
            );
          })}
        </div>
      </div>
      {selectedDia && (
        <div style={{ animation: "fadeIn 0.5s" }}>
          {cargandoTurnos ? (
             <p style={{color: "#888", textAlign: "center"}}>Buscando disponibilidad...</p>
          ) : diaCompleto ? (
            <div style={{ padding: "20px", backgroundColor: "#fee2e2", borderRadius: "15px", border: "2px solid #ef4444", color: "#b91c1c", textAlign: "center" }}>
              <strong>⛔ Día Completo</strong>
              <p style={{ margin: "5px 0 0 0" }}>Por favor, seleccioná otra fecha.</p>
            </div>
          ) : (
            <div style={{ padding: "25px", backgroundColor: "#f0fdf4", borderRadius: "20px", border: "2px solid #22c55e", textAlign: "center" }}>
              <p style={{ color: "#15803d", marginBottom: "10px", fontSize: "1.1rem" }}>✅ Horario asignado automáticamente:</p>
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#166534" }}>{selectedHora} hs</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}