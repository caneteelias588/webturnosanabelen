"use client";

// Actualizamos los días y horarios según tu pedido
const DIAS = ["Martes", "Miércoles", "Jueves", "Viernes"];
const HORARIOS = [
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45"
];

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
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      
      {/* SECCIÓN DÍAS */}
      <div>
        <h3 style={{ marginBottom: 15, fontSize: "1.1rem", color: "#444" }}>Seleccioná un día:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {DIAS.map((dia) => {
            const isSelected = selectedDia === dia;
            return (
              <button
                key={dia}
                onClick={() => onSelectDia(dia)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: isSelected ? "1px solid #009ee3" : "1px solid #ddd",
                  cursor: "pointer",
                  // Si está seleccionado, fondo azul y texto blanco
                  backgroundColor: isSelected ? "#009ee3" : "#fff",
                  color: isSelected ? "#fff" : "#555",
                  fontWeight: isSelected ? "bold" : "normal",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 4px 8px rgba(0,158,227,0.2)" : "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                {dia}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN HORARIOS (Solo aparece si ya elegiste día) */}
      {selectedDia && (
        <div style={{ animation: "fadeIn 0.5s ease-in-out" }}>
          <h3 style={{ marginBottom: 15, fontSize: "1.1rem", color: "#444" }}>
            Horarios disponibles para el {selectedDia}:
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "12px" }}>
            {HORARIOS.map((hora) => {
              const isSelected = selectedHora === hora;
              return (
                <button
                  key={hora}
                  onClick={() => onSelectHora(hora)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: isSelected ? "1px solid #28a745" : "1px solid #ddd",
                    cursor: "pointer",
                    // Si está seleccionado, fondo verde y texto blanco
                    backgroundColor: isSelected ? "#28a745" : "#fff",
                    color: isSelected ? "#fff" : "#555",
                    fontWeight: isSelected ? "bold" : "normal",
                    transition: "all 0.2s ease",
                    textAlign: "center",
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