import { useState, useMemo } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import "../../assets/styles/ConsultaMuestra.css";

const ConsultaMuestra = () => {
  const datosOriginales = [
    { id: 1, fecha: "2025-07-10", usuario: "Alberto", ingreso: 1500, observacion: "Ingreso correcto" },
    { id: 2, fecha: "2025-07-09", usuario: "María", ingreso: 2000, observacion: "Ingreso retrasado" },
    { id: 3, fecha: "2025-07-08", usuario: "Juan", ingreso: 1800, observacion: "Ingreso aprobado" },
    { id: 4, fecha: "2025-07-07", usuario: "Ana", ingreso: 1700, observacion: "Ingreso pendiente" },
    { id: 5, fecha: "2025-07-06", usuario: "Luis", ingreso: 1600, observacion: "Ingreso confirmado" },
    { id: 6, fecha: "2025-07-05", usuario: "Sofía", ingreso: 1900, observacion: "Ingreso en revisión" },
    { id: 7, fecha: "2025-07-04", usuario: "Carlos", ingreso: 2100, observacion: "Ingreso rechazado" },
    { id: 8, fecha: "2025-07-03", usuario: "Marta", ingreso: 1750, observacion: "Ingreso aprobado" },
    // más datos si quieres...
  ];

  const [detalleVisible, setDetalleVisible] = useState(false);
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 4;

  // Filtrar datos por búsqueda (busca en usuario y observación, fecha e id también)
  const datosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    return datosOriginales.filter(({ id, fecha, usuario, observacion }) =>
      id.toString().includes(texto) ||
      fecha.toLowerCase().includes(texto) ||
      usuario.toLowerCase().includes(texto) ||
      observacion.toLowerCase().includes(texto)
    );
  }, [busqueda, datosOriginales]);

  // Calcular datos de la página actual
  const indiceUltimaFila = paginaActual * filasPorPagina;
  const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
  const datosPagina = datosFiltrados.slice(indicePrimeraFila, indiceUltimaFila);
  const totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  const abrirDetalle = (fila: any) => {
    setFilaSeleccionada(fila);
    setDetalleVisible(true);
  };

  const cerrarDetalle = () => {
    setDetalleVisible(false);
    setFilaSeleccionada(null);
  };

  const cambiarPagina = (numPagina: any) => {
    setPaginaActual(numPagina);
  };

  return (
    <div className="consulta-container">
      <h2 className="consulta-title">
        <HiOutlineClipboardList style={{ marginRight: "0.5rem" }} />
        Listado de Contratos
     </h2>
      
      <div className="input-icon-wrapper">
  <FiSearch className="input-icon" />
  <input
    type="text"
    placeholder="Buscar por Contrato, Cliente"
    value={busqueda}
    onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
    className="consulta-buscador"
    aria-label="Buscar en la tabla"
    />
    </div>

      <table className="consulta-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Contrato</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosPagina.length > 0 ? (
            datosPagina.map((fila) => (
              <tr key={fila.id} className="consulta-row">
                <td>{fila.id}</td>
                <td>{fila.fecha}</td>
                <td>{fila.usuario}</td>
                <td className="detalle-cell">
                  <button
                    onClick={() => abrirDetalle(fila)}
                    className="detalle-button"
                    title={`Ver detalle de ingreso ${fila.id}`}
                    aria-label={`Ver detalle de ingreso ${fila.id}`}
                  >
                    <FiEye size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem", color: "#64748b" }}>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="consulta-paginacion" role="navigation" aria-label="Paginación de tabla">
          <button
            className="paginacion-btn"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            aria-label="Página anterior"
          >
            ‹
          </button>

          {[...Array(totalPaginas)].map((_, i) => {
            const num = i + 1;
            return (
              <button
                key={num}
                className={`paginacion-btn ${num === paginaActual ? "activo" : ""}`}
                onClick={() => cambiarPagina(num)}
                aria-current={num === paginaActual ? "page" : undefined}
              >
                {num}
              </button>
            );
          })}

          <button
            className="paginacion-btn"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            aria-label="Página siguiente"
          >
            ›
          </button>
        </div>
      )}

      {/* Popup modal */}
      {detalleVisible && filaSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetalle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button
              className="modal-close"
              onClick={cerrarDetalle}
              aria-label="Cerrar detalle"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultaMuestra;
