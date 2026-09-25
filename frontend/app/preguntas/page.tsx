"use client";

export default function PreguntasPage() {
  const faqs = [
    {
      pregunta: "¿Cómo funciona el proceso de reserva?",
      respuesta: "Es muy simple: seleccionás el tipo de atención (Consulta o Apto), elegís el día y horario disponible en tiempo real, completás la ficha del paciente y abonás la seña mediante Mercado Pago para asegurar el turno."
    },
    {
      pregunta: "¿Qué sucede ante una urgencia hospitalaria o guardia?",
      respuesta: "Debido a la labor médica y hospitalaria de la Dra., en ocasiones puntuales pueden presentarse guardias o urgencias imprevistas. En tales casos, nos comunicamos a la brevedad por WhatsApp para coordinar una reprogramación prioritaria o efectuar la devolución total de la seña si no contás con disponibilidad en otro horario."
    },
    {
      pregunta: "¿La seña abonada se descuenta del costo total?",
      respuesta: "Sí, el monto abonado en concepto de seña online se deduce íntegramente del arancel de la consulta. La diferencia restante se abona de manera presencial en el consultorio el día de la atención."
    },
    {
      pregunta: "¿Se atiende a través de obras sociales y prepagas?",
      respuesta: "Sí, atendemos con diversas coberturas médicas. Al momento de iniciar la reserva, podés seleccionar la modalidad 'Obra Social' para visualizar las condiciones y el arancel correspondiente."
    },
    {
      pregunta: "¿Es posible cancelar o reprogramar un turno?",
      respuesta: "Podés avisarnos por WhatsApp con al menos 24 horas de antelación para reorganizar la fecha. Recordá que, por razones de organización de agenda, la seña no es reintegrable ante inasistencias sin previo aviso."
    }
  ];

  return (
    <div style={{ maxWidth: "780px", margin: "30px auto 70px auto", padding: "0 20px" }}>
      
      {/* ENCABEZADO INSTITUCIONAL */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span style={{ 
          display: "inline-block", 
          padding: "5px 14px", 
          backgroundColor: "#fce7f3", 
          color: "#be185d", 
          borderRadius: "30px", 
          fontSize: "0.78rem", 
          fontWeight: "700",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          marginBottom: "10px"
        }}>
          Centro de Ayuda
        </span>
        <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: "700", color: "#1f2937", letterSpacing: "-0.5px" }}>
          Preguntas Frecuentes
        </h1>
        <p style={{ margin: "8px 0 0 0", color: "#6b7280", fontSize: "0.98rem" }}>
          Información clave sobre atención, aranceles y gestión de turnos
        </p>
      </div>

      {/* LISTADO DE PREGUNTAS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={estiloCarta}>
            <h3 style={{ color: "#db2777", margin: "0 0 10px 0", fontSize: "1.1rem", fontWeight: "700", lineHeight: "1.4" }}>
              {faq.pregunta}
            </h3>
            <p style={{ color: "#4b5563", lineHeight: "1.6", fontSize: "0.95rem", margin: 0 }}>
              {faq.respuesta}
            </p>
          </div>
        ))}
      </div>

      {/* BLOQUE FORMAL DE WHATSAPP AL PIE */}
      <div style={{
        marginTop: "50px",
        padding: "32px 25px",
        backgroundColor: "#ffffff",
        borderRadius: "22px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "12px"
      }}>
        <h4 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "700", color: "#111827" }}>
          ¿Tenés alguna consulta adicional?
        </h4>
        <p style={{ color: "#6b7280", fontSize: "0.92rem", maxWidth: "480px", margin: 0, lineHeight: "1.5" }}>
          Si tu cobertura no figura en la web o necesitás asistencia previa con la reserva, escribinos de forma directa.
        </p>

        <a 
          href="https://wa.me/5493876405797?text=¡Hola%20Dra.%20Ana%20Belén!%20Me%20contacto%20desde%20la%20web%20por%20una%20consulta." 
          target="_blank" 
          rel="noopener noreferrer"
          className="wpp-btn-hover"
          style={{ 
            marginTop: "8px",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#25d366",
            color: "#ffffff",
            padding: "13px 26px",
            borderRadius: "50px",
            fontSize: "0.98rem",
            fontWeight: "700",
            textDecoration: "none",
            boxShadow: "0 6px 16px rgba(37, 211, 102, 0.28)",
            transition: "all 0.2s"
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          Consultanos por WhatsApp
        </a>
      </div>

      <style jsx>{`
        .wpp-btn-hover:hover {
          background-color: #20ba5a !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35) !important;
        }
      `}</style>
    </div>
  );
}

const estiloCarta = {
  backgroundColor: "#ffffff",
  padding: "24px 28px",
  borderRadius: "18px",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.03)",
  border: "1px solid #f3f4f6"
};