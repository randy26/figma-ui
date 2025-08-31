import { useState } from "react";
import "../../assets/styles/muestraObservacion.css";

interface Muestra {
  presupuesto: string;
  muestra: string;
  observacion: string;
  estado: "Enviado" | "No enviado";
  contacto: string;
  telefono: string;
  email: string;
  imagenes: string[];
}

// Datos hardcodeados
const muestrasData: Muestra[] = [
  {
    presupuesto: "MIC-GIV-55548I-TY1",
    muestra: "100258",
    observacion: "Frasco con roturas",
    estado: "Enviado",
    contacto: "Ignacio Capurro",
    telefono: "54 11 5932172",
    email: "icapurro@siemens.com",
    imagenes: ["https://via.placeholder.com/80", "https://via.placeholder.com/80"],
  },
  {
    presupuesto: "MIC-IFF-859874-TTR",
    muestra: "100562",
    observacion: "Etiqueta poco clara",
    estado: "No enviado",
    contacto: "Ignacio Capurro",
    telefono: "54 11 5932172",
    email: "icapurro@siemens.com",
    imagenes: ["https://via.placeholder.com/80", "https://via.placeholder.com/80"],
  },
  {
    presupuesto: "MIC-GIV-55548I-TY1",
    muestra: "100563",
    observacion: "Falta cantidad de muestra",
    estado: "No enviado",
    contacto: "Ignacio Capurro",
    telefono: "54 11 5932172",
    email: "icapurro@siemens.com",
    imagenes: ["https://via.placeholder.com/80"],
  },
];

export default function MuestrasConObservaciones() {
  const [selected, setSelected] = useState<Muestra | null>(null);

  const marcarResuelto = () => {
    if (selected) {
      setSelected({ ...selected, estado: "Enviado" });
    }
  };

  return (
    <div className="consulta-container">
      {/* Listado */}
      <div>
        <h2 className="consulta-title">Listado de muestras con observaciones</h2>
        <table className="consulta-table">
          <thead>
            <tr>
              <th>Presupuesto</th>
              <th>Muestra</th>
              <th>Observaciones</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {muestrasData.map((m, idx) => (
              <tr
                key={idx}
                onClick={() => setSelected(m)}
                className={selected?.muestra === m.muestra ? "fila-resaltada" : ""}
              >
                <td data-label="Presupuesto">{m.presupuesto}</td>
                <td data-label="Muestra">{m.muestra}</td>
                <td data-label="Observaciones">{m.observacion}</td>
                <td data-label="Estado">
                  <span
                    className={`estado-badge ${
                      m.estado === "Enviado" ? "enviado" : "no-enviado"
                    }`}
                  >
                    {m.estado}
                  </span>
                  {m.estado === "No enviado" && (
                    <button
                      className="detalle-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected({ ...m, estado: "Enviado" });
                      }}
                    >
                      Resuelto
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle */}
      <div>
        <h2 className="consulta-title">Detalle de la observación</h2>
        {selected ? (
          <div className="detalle-formulario">
            <div className="form-row">
              <label>Contrato:</label>
              <span>{selected.presupuesto}</span>
            </div>
            <div className="form-row">
              <label>Número de muestra:</label>
              <span>{selected.muestra}</span>
            </div>
            <div className="form-row">
              <label>Observación:</label>
              <span>{selected.observacion}</span>
            </div>

            <div className="form-row">
              <label>Imágenes:</label>
              <div className="imagenes-grid">
                {selected.imagenes.map((img, i) => (
                  <div key={i} className="imagen-wrapper">
                    <img src={img} alt="muestra" className="imagen-muestra" />
                    <button
                      className="imagen-eliminar"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selected) {
                          const nuevasImgs = selected.imagenes.filter((_, index) => index !== i);
                          setSelected({ ...selected, imagenes: nuevasImgs });
                        }
                      }}
                    >
                      {/* Icono de basura */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                <div
                  className="imagen-placeholder"
                  onClick={() => {
                    const fileInput = document.createElement("input");
                    fileInput.type = "file";
                    fileInput.accept = "image/*";
                    fileInput.onchange = (e: any) => {
                      const file = e.target.files[0];
                      if (file && selected) {
                        const url = URL.createObjectURL(file);
                        setSelected({ ...selected, imagenes: [...selected.imagenes, url] });
                      }
                    };
                    fileInput.click();
                  }}
                >
                  +
                </div>
              </div>
            </div>

            <div className="form-row">
              <label>Contacto:</label>
              <span>{selected.contacto}</span>
            </div>
            <div className="form-row">
              <label>Teléfono:</label>
              <span>{selected.telefono}</span>
            </div>
            <div className="form-row">
              <label>Email:</label>
              <span>{selected.email}</span>
            </div>

            {selected.estado === "No enviado" && (
              <div className="detalle-buttons">
                <button className="detalle-button">Enviar a contacto</button>
                <button className="detalle-button" onClick={marcarResuelto}>
                  Resuelto
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Seleccione una muestra...</p>
        )}
      </div>
    </div>
  );
}
