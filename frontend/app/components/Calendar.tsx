"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore"; 

// 👇 LISTA DE HORARIOS EXACTA (17:00 a 18:45)
const HORARIOS = [
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45"
];

const generarDiasReales = () => {
  const diasGenerados = [];
  const hoy = new Date();
  
  // Buscamos disponibilidad en los próximos 14 días
  for (let i = 0; i < 14; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    
    // 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes
    const diaSemana = fecha.getDay();

    if (diaSemana >= 2 && diaSemana <= 5) {
      const nombreDia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
      const numeroDia = fecha.getDate();
      // Capitalizamos la primera letra: "martes" -> "Martes"
      const etiqueta = `${nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1)} ${numeroDia}`; 
      
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0");
      const day = String(fecha.getDate()).padStart(2, "0");
      
      // Formato YYYY-MM-DD para guardar en la base de datos
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

export default function Calendar({
  selectedDia,
  selectedHora,
  onSelectDia,
  onSelectHora,
}: CalendarProps) {
  
  const [diasDisponibles] = useState(generarDiasReales());
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [cargandoTurnos, setCargandoTurnos] = useState(true);
  const [diaCompleto, setDiaCompleto] = useState(false);

  // 1. CARGAR TURNOS OCUPADOS DESDE FIREBASE
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "turnos"));
        const listaOcupados: string[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Guardamos formato "2024-02-20_17:00"
          listaOcupados.push(`${data.dia}_${data.hora}`);
        });
        
        setOcupados(listaOcupados);
        setCargandoTurnos(false);
      } catch (error) {
        console.error("Error al conectar con Firebase:", error);
      }
    };
    cargarTurnos();
  }, []);

  // 2. LÓGICA DE ASIGNACIÓN AUTOMÁTICA (TETRIS)
  useEffect(() => {
    // Solo calculamos si hay un día seleccionado y ya cargaron los ocupados
    if (selectedDia && !cargandoTurnos) {
      
      let horarioEncontrado = null;

      // Recorremos la lista de horarios en orden estricto
      for (let hora of HORARIOS) {
        const identificador = `${selectedDia}_${hora}`;
        
        // Si NO está en la lista de ocupados, este es el ganador
        if (!ocupados.includes(identificador)) {
          horarioEncontrado = hora;
          break; // Frenamos el bucle porque ya encontramos el primero libre
        }
      }

      if (horarioEncontrado) {
        setDiaCompleto(false);
        onSelectHora(horarioEncontrado); // ¡ASIGNACIÓN AUTOMÁTICA!
      } else {
        setDiaCompleto(true);
        onSelectHora(null); // No hay lugar ese día
      }
    }
  }, [selectedDia, ocupados, cargandoTurnos, onSelectHora]);

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
                onClick={() => {
                   onSelectDia(diaObj.valor);
                   // Reseteamos visualmente al cambiar de día
                   setDiaCompleto(false);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: isSelected ? "2px solid #db2777" : "1px solid #ddd", 
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#fce7f3" : "#fff",
                  color: isSelected ? "#db2777" : "#555",
                  fontWeight: isSelected ? "bold" : "normal",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 8px rgba(219, 39, 119, 0.2)" : "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                {diaObj.etiqueta}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN RESULTADO AUTOMÁTICO */}
      {selectedDia && (
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          
          {cargandoTurnos ? (
             <p style={{color: "#888", textAlign: "center"}}>Buscando disponibilidad...</p>
          ) : diaCompleto ? (
            <div style={{ padding: "20px", backgroundColor: "#fee2e2", borderRadius: "15px", border: "2px solid #ef4444", color: "#b91c1c", textAlign: "center" }}>
              <strong>⛔ Día Completo</strong>
              <p style={{ margin: "5px 0 0 0" }}>Por favor, seleccioná otra fecha.</p>
            </div>
          ) : (
            <div style={{ padding: "25px", backgroundColor: "#f0fdf4", borderRadius: "20px", border: "2px solid #22c55e", textAlign: "center", boxShadow: "0 4px 15px rgba(34, 197, 94, 0.15)" }}>
              <p style={{ color: "#15803d", marginBottom: "10px", fontSize: "1.1rem" }}>✅ Horario asignado automáticamente:</p>
              
              {/* Muestra la hora en grande */}
              <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#166534" }}>
                {selectedHora} hs
              </div>
              
              {/* YA NO HAY TEXTO ABAJO */}
            </div>
          )}

        </div>
      )}
    </div>
  );
}