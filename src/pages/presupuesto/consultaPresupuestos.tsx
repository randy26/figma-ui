import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineClipboardList, HiPencil } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { HiOutlineDocument } from "react-icons/hi";
import { MdAddCircleOutline } from "react-icons/md";
import "../../assets/styles/consultaPresupuesto.css";
import type { ResultPresupuesto } from "../../model/ResultPresupuesto";
import { DateUtils } from '../../util/DateUtils';
import { PresupuestoService } from "../../service/PresupuestoService";

const ConsultaPresupuestos = () => {
  const [presupuestos, setPresupuestos] = useState<ResultPresupuesto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        const datos = await PresupuestoService.obtenerPresupuestos();
        setPresupuestos(datos);
      } catch (err: any) {
        setError(err.message || "Error al obtener presupuestos");
      } finally {
        setCargando(false);
      }
    };

    fetchPresupuestos();
  }, []);

  const datosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase();
    return presupuestos.filter(({ idPresupuesto, fechaPresupuesto, titulo, ordenDeCompra }) =>
      idPresupuesto.toString().includes(texto) ||
      (fechaPresupuesto?.toLowerCase?.() || "").includes(texto) ||
      titulo.toLowerCase().includes(texto) ||
      (ordenDeCompra?.toLowerCase?.() || "").includes(texto)
    );
  }, [busqueda, presupuestos]);

  const indiceUltimaFila = paginaActual * filasPorPagina;
  const indicePrimeraFila = indiceUltimaFila - filasPorPagina;
  const datosPagina = datosFiltrados.slice(indicePrimeraFila, indiceUltimaFila);
  const totalPaginas = Math.ceil(datosFiltrados.length / filasPorPagina);

  const cambiarPagina = (numPagina: number) => {
    if (numPagina < 1 || numPagina > totalPaginas) return;
    setPaginaActual(numPagina);
  };

  if (cargando) return <p>Cargando presupuestos...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="consulta-container">
      <h2 className="consulta-title">
        <HiOutlineClipboardList style={{ marginRight: "0.5rem" }} />
        Listado de Presupuestos
      </h2>

      <div className="top-bar">
        <div className="input-icon-wrapper">
          <FiSearch className="input-icon" />
          <input
            type="text"
            placeholder="Buscar por título, cliente, orden de compra..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="consulta-buscador"
            aria-label="Buscar en la tabla"
          />
        </div>
        <button
          className="nuevo-btn fancy-btn btn-amarillo"
          onClick={() => navigate("/presupuestos/nuevo")}
        >
          <MdAddCircleOutline size={20} style={{ marginRight: "0.5rem" }} />
          Nuevo Presupuesto
        </button>
      </div>

     <table className="consulta-table" role="table" aria-label="Tabla de presupuestos">
  <thead>
    <tr>
      <th>Título</th>
      <th>Fecha Presupuesto</th>
      <th>Fecha Aceptación</th>
      <th>Orden de Compra</th>
      <th>Referencia</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {datosPagina.length > 0 ? (
      datosPagina.map((fila) => (
        <tr key={fila.idPresupuesto} className="consulta-row">
          <td>{fila.titulo}</td>
          <td>{DateUtils.formatDate(fila.fechaPresupuesto)}</td>
          <td>{DateUtils.formatDate(fila.fechaAceptacion || '-')}</td>
          <td>{fila.ordenDeCompra || '-'}</td>
          <td>{fila.referencia || '-'}</td>
          <td aria-label="Estado Presupuesto">
          {fila.estadoPresupuesto ? (
            <FaTimesCircle style={{ color: 'red' }} title="Inactivo" />
          ) : (
            <FaCheckCircle style={{ color: 'green' }} title="Activo" />
          )}
        </td>
        <td className="detalle-cell">
          {fila.estadoPresupuesto ? (
            <button
              onClick={() => navigate(`/presupuestos/nuevo?id=${fila.idPresupuesto}&modo=detalle`)}
              className="detalle-button"
              title={`Ver detalle presupuesto ${fila.idPresupuesto}`}
              aria-label={`Ver detalle presupuesto ${fila.idPresupuesto}`}
            >
              <HiOutlineDocument size={18} />
            </button>
          ) : (
            <button
              onClick={() => navigate(`/presupuestos/nuevo?id=${fila.idPresupuesto}&modo=editar`)}
              className="editar-button"
              title={`Editar presupuesto ${fila.idPresupuesto}`}
              aria-label={`Editar presupuesto ${fila.idPresupuesto}`}
            >
              <HiPencil size={18} />
            </button>
          )}
        </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={13} style={{ textAlign: "center", padding: "1rem", color: "#64748b" }}>
          No se encontraron resultados.
        </td>
      </tr>
    )}
  </tbody>
</table>


      {totalPaginas > 1 && (
        <nav className="consulta-paginacion" aria-label="Paginación de tabla">
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
        </nav>
      )}
    </div>
  );
};

export default ConsultaPresupuestos;
