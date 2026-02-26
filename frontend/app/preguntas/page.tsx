"use client";

export default function PreguntasPage() {
  const faqs = [
    {
      pregunta: "¿Cómo reservo un turno?",
      respuesta: "Es muy simple: elegí el tipo de servicio (Consulta o Apto), seleccioná el día y horario disponible, completá los datos del paciente y realizá el pago de la seña a través de Mercado Pago."
    },
    {
      pregunta: "¿Qué pasa si la Dra. tiene una urgencia hospitalaria?",
      respuesta: "Como la Dra. trabaja en el hospital, pueden surgir guardias o urgencias de último momento. En ese caso, te avisaremos por WhatsApp para reprogramar tu turno a la brevedad o realizar la devolución de la seña si no podés en otro horario."
    },
    {
      pregunta: "¿La seña se descuenta del total?",
      respuesta: "Sí, la seña que pagás online se descuenta del valor total de la consulta. El saldo restante se abona en el consultorio el día del turno."
    },
    {
      pregunta: "¿Atiende obras sociales?",
      respuesta: "Sí, trabajamos con varias obras sociales. Al momento de reservar, seleccioná la opción 'Obra Social' para ver el valor correspondiente."
    },
    {
      pregunta: "¿Puedo cancelar o cambiar mi turno?",
      respuesta: "Podés avisarnos por WhatsApp con al menos 24 horas de antelación para reprogramar. Recordá que la seña no es reembolsable en caso de inasistencia sin aviso previo."
    }
  ];

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#db2777", textAlign: "center", marginBottom: "40px", fontSize: "2.2rem", fontWeight: "bold" }}>
        Preguntas Frecuentes
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={estiloCarta}>
            <h3 style={{ color: "#db2777", marginBottom: "10px", fontSize: "1.2rem", fontWeight: "bold" }}>
              {faq.pregunta}
            </h3>
            <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "1.05rem", margin: 0 }}>
              {faq.respuesta}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "50px", textAlign: "center", padding: "30px", backgroundColor: "#fff1f2", borderRadius: "20px", border: "1px solid #fce7f3" }}>
        <p style={{ color: "#db2777", fontWeight: "bold", marginBottom: "10px" }}>¿Tenés otra duda?</p>
        <a 
          href="https://wa.me/5493876405797" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: "#25D366", fontWeight: "bold", textDecoration: "none", fontSize: "1.2rem" }}
        >
          Consultanos por WhatsApp 📲
        </a>
      </div>
    </div>
  );
}

const estiloCarta = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 4px 15px rgba(219, 39, 119, 0.08)",
  border: "1px solid #fce7f3"
};