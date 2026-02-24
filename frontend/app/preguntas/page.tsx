"use client";

export default function FAQPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      
      <div style={estiloTarjeta}>
        <h1 style={{ color: "#db2777", textAlign: "center", marginBottom: "40px", fontSize: "2.5rem" }}>❓ Preguntas Frecuentes</h1>
        
        <div style={estiloPregunta}>
          {/* COLOR NEGRO #111827 */}
          <h3 style={{ color: "#db2777", marginBottom: "10px", fontSize: "1.4rem" }}>¿Atienden con Obra Social?</h3>
          <p style={{ color: "#111827", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Sí, atendemos con diversas obras sociales. Por favor seleccioná la opción "Obra Social" al reservar para ver el precio diferencial.
          </p>
        </div>

        <div style={estiloPregunta}>
          <h3 style={{ color: "#db2777", marginBottom: "10px", fontSize: "1.4rem" }}>¿Qué pasa si no puedo asistir?</h3>
          <p style={{ color: "#111827", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Si no podés asistir, por favor avisanos con 24hs de anticipación. Recordá que la seña abonada no es reembolsable.
          </p>
        </div>

        <div style={estiloPregunta}>
          <h3 style={{ color: "#db2777", marginBottom: "10px", fontSize: "1.4rem" }}>¿Puedo ir con acompañante?</h3>
          <p style={{ color: "#111827", fontSize: "1.1rem", lineHeight: "1.6" }}>
            Sí, los pacientes menores de edad deben ingresar acompañados por un padre o tutor responsable.
          </p>
        </div>

      </div>
    </div>
  );
}

const estiloTarjeta = { 
  backgroundColor: "white", 
  padding: "40px", 
  borderRadius: "30px", 
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)" 
};

const estiloPregunta = {
  marginBottom: "25px",
  paddingBottom: "25px",
  borderBottom: "1px solid #eee"
};