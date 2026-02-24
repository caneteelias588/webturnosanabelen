"use client";

export default function UbicacionPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      
      <div style={estiloTarjeta}>
        <h1 style={{ color: "#db2777", textAlign: "center", marginBottom: "20px", fontSize: "2.5rem" }}>📍 ¿Dónde estamos?</h1>
        
        <p style={{ fontSize: "1.3rem", color: "#111827", textAlign: "center", marginBottom: "30px", lineHeight: "1.6" }}>
          Te esperamos en <strong>Consultorios Santa Sofía</strong><br/>
          José Ignacio Sierra 330, San José de Metán, Salta.
        </p>
        
        {/* MAPA ARREGLADO: Ahora usa la dirección exacta en la búsqueda */}
        <div style={{ borderRadius: "20px", overflow: "hidden", border: "4px solid #fce7f3", height: "400px", marginBottom: "30px" }}>
          <iframe 
            width="100%" 
            height="100%" 
            id="gmap_canvas" 
            src="https://maps.google.com/maps?q=José%20Ignacio%20Sierra%20330%2C%20San%20José%20de%20Metán%2C%20Salta&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            frameBorder="0" 
            scrolling="no" 
            style={{ border: 0 }}
          ></iframe>
        </div>

        <a 
          href="https://www.google.com/maps/search/?api=1&query=José+Ignacio+Sierra+330,+San+José+de+Metán,+Salta" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: "block", textAlign: "center", padding: "20px", backgroundColor: "#db2777", color: "white", borderRadius: "50px", fontWeight: "bold", textDecoration: "none", fontSize: "1.2rem", boxShadow: "0 8px 20px rgba(219, 39, 119, 0.3)" }}
        >
          🗺️ Abrir en Google Maps (GPS)
        </a>
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