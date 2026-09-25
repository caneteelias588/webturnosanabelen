"use client";

export default function UbicacionPage() {
  const direccionTexto = "José Ignacio Sierra 330, San José de Metán, Salta";
  const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionTexto)}`;

  return (
    <div style={{ maxWidth: "780px", margin: "30px auto 70px auto", padding: "0 20px" }}>
      
      {/* ENCABEZADO INSTITUCIONAL */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
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
          Sede de Atención
        </span>
        <h1 style={{ margin: 0, fontSize: "2.3rem", fontWeight: "700", color: "#1f2937", letterSpacing: "-0.5px" }}>
          Ubicación del Consultorio
        </h1>
        <p style={{ margin: "8px 0 0 0", color: "#6b7280", fontSize: "0.98rem" }}>
          Te esperamos en Consultorios Santa Sofía
        </p>
      </div>

      <div style={estiloTarjeta}>
        
        {/* GRILLA DE INFORMACIÓN CLAVE */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "16px", 
          marginBottom: "25px",
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #f3f4f6"
        }}>
          <div>
            <div style={estiloDetalleLabel}>Consultorio</div>
            <div style={estiloDetalleValor}>Consultorios Santa Sofía</div>
            <div style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "2px" }}>Atención Pediátrica Integral</div>
          </div>

          <div>
            <div style={estiloDetalleLabel}>Dirección</div>
            <div style={estiloDetalleValor}>José Ignacio Sierra 330</div>
            <div style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "2px" }}>San José de Metán, Salta</div>
          </div>

          <div>
            <div style={estiloDetalleLabel}>Modalidad</div>
            <div style={estiloDetalleValor}>Atención con Turno Previo</div>
            <div style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "2px" }}>Reserva y confirmación online</div>
          </div>
        </div>

        {/* MAPA EMBEBIDO ELEGANTE */}
        <div style={{ 
          borderRadius: "16px", 
          overflow: "hidden", 
          border: "1px solid #e5e7eb", 
          height: "380px", 
          marginBottom: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
        }}>
          <iframe 
            width="100%" 
            height="100%" 
            id="gmap_canvas" 
            src="https://maps.google.com/maps?q=José%20Ignacio%20Sierra%20330%2C%20San%20José%20de%20Metán%2C%20Salta&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            frameBorder="0" 
            scrolling="no" 
            style={{ border: 0 }}
            title="Mapa Consultorios Santa Sofía"
          ></iframe>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a 
            href={urlGoogleMaps} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-maps"
            style={{ 
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "16px 24px", 
              backgroundColor: "#db2777", 
              color: "white", 
              borderRadius: "14px", 
              fontWeight: "700", 
              textDecoration: "none", 
              fontSize: "1.05rem", 
              boxShadow: "0 6px 18px rgba(219, 39, 119, 0.25)",
              transition: "all 0.2s"
            }}
          >
            {/* SVG Pin de Mapa */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Abrir en Google Maps (Navegación GPS)
          </a>

          <a 
            href="https://wa.me/5493876405797?text=¡Hola%20Dra.%20Ana%20Belén!%20Tengo%20una%20consulta%20sobre%20cómo%20llegar%20al%20consultorio." 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-wpp-ubicacion"
            style={{ 
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "#15803d", 
              fontWeight: "600", 
              textDecoration: "none", 
              fontSize: "0.92rem",
              padding: "12px 18px",
              borderRadius: "14px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              transition: "all 0.2s"
            }}
          >
            <svg width="18" height="18" fill="#16a34a" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            ¿Dudas sobre cómo llegar? Escribinos por WhatsApp
          </a>
        </div>

      </div>

      <style jsx>{`
        .btn-maps:hover {
          background-color: #be185d !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(219, 39, 119, 0.35) !important;
        }
        .btn-wpp-ubicacion:hover {
          background-color: #dcfce7 !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

const estiloTarjeta = { 
  backgroundColor: "#ffffff", 
  padding: "32px 30px", 
  borderRadius: "22px", 
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
  border: "1px solid #f3f4f6"
};

const estiloDetalleLabel = {
  fontSize: "0.78rem",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "4px",
  fontWeight: "600" as const
};

const estiloDetalleValor = {
  fontSize: "1rem",
  fontWeight: "700" as const,
  color: "#111827"
};