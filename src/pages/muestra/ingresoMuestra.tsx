import { useState, useEffect } from "react";
import "../../assets/styles/ingresoMuestra.css";
import { PresupuestoService } from "../../service/PresupuestoService";

interface Contrato {
  titulo: string;
  cliente: string;
  muestras: Muestra[];
}

interface Muestra {
  nombre: string;
  cantidadMuestras: number | null;
  cantidadEnvases: number | null;
  detalles?: DetalleMuestra[];
}

interface DetalleMuestra {
  numero: string;
  envases: number;
  descripcion: string;
}

export default function IngresoMuestra() {
  const [contratosData, setContratosData] = useState<Contrato[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
  const [selectedMuestra, setSelectedMuestra] = useState<Muestra | null>(null);

  const [loadingContratos, setLoadingContratos] = useState<boolean>(false);
  const [loadingMuestras, setLoadingMuestras] = useState<boolean>(false);
  const [loadingDetalle, setLoadingDetalle] = useState<boolean>(false);

  // Cargar contratos al iniciar
  useEffect(() => {
    const fetchContratos = async () => {
      setLoadingContratos(true);
      try {
        const data = await PresupuestoService.obtenerPresupuestosConMuestras();
        const contratos: Contrato[] = data.map((p: any) => ({
          titulo: p.titulo,
          cliente: p.cliente,
          muestras: p.muestras.map((m: any) => ({
            nombre: m.titulo,
            cantidadMuestras: m.muestras ?? null,
            cantidadEnvases: null,
            detalles: [],
          })),
        }));

        setContratosData(contratos);

        if (contratos.length > 0) {
          setSelectedContrato(contratos[0]);
          if (contratos[0].muestras.length > 0) {
            setSelectedMuestra(contratos[0].muestras[0]);
          }
        }
      } catch (error) {
        console.error("❌ Error al cargar presupuestos con muestras:", error);
      } finally {
        setLoadingContratos(false);
      }
    };

    fetchContratos();
  }, []);

  // Simular loading de muestras al cambiar contrato
  const handleSelectContrato = (contrato: Contrato) => {
    setLoadingMuestras(true);
    setSelectedContrato(contrato);
    setSelectedMuestra(null);

    setTimeout(() => {
      if (contrato.muestras.length > 0) {
        setSelectedMuestra(contrato.muestras[0]);
      }
      setLoadingMuestras(false);
    }, 300); // simula carga
  };

  // Simular loading de detalle al cambiar muestra
  const handleSelectMuestra = (muestra: Muestra) => {
    setLoadingDetalle(true);
    setSelectedMuestra(null);

    setTimeout(() => {
      setSelectedMuestra(muestra);
      setLoadingDetalle(false);
    }, 300); // simula carga
  };

  return (
    <div className="ingreso-container">
      {/* Panel contratos */}
      <div className="panel">
        <h3>Listado de Contratos</h3>
        {loadingContratos ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando contratos...</p>
          </div>
        ) : (
          contratosData.map((contrato, i) => (
            <div
              key={i}
              className={`item ${contrato.titulo === selectedContrato?.titulo ? "selected" : ""}`}
              onClick={() => handleSelectContrato(contrato)}
            >
              <p><strong>Contrato:</strong> {contrato.titulo}</p>
              <p><strong>Cliente:</strong> {contrato.cliente}</p>
            </div>
          ))
        )}
      </div>

      {/* Panel muestras */}
      <div className="panel">
        <h3>Detalle de las muestras</h3>
        {loadingMuestras ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando muestras...</p>
          </div>
        ) : (
          selectedContrato?.muestras.map((muestra, i) => (
            <div
              key={i}
              className={`item ${muestra.nombre === selectedMuestra?.nombre ? "selected" : ""}`}
              onClick={() => handleSelectMuestra(muestra)}
            >
              <p><strong>{muestra.nombre}</strong></p>
              <p>C. muestras: {muestra.cantidadMuestras ?? "-"}</p>
              <p>C. envases: {muestra.cantidadEnvases ?? "-"}</p>
            </div>
          ))
        )}
      </div>

      {/* Panel detalle muestra */}
      <div className="panel">
        {loadingDetalle ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando detalle...</p>
          </div>
        ) : selectedMuestra ? (
          <>
            <div className="panel-header">
              <h3>Detalle: {selectedMuestra?.nombre}</h3>
              <button className="btn">Dar ingreso</button>
            </div>

            {selectedMuestra?.detalles && selectedMuestra.detalles.length > 0 && (
              <table className="tabla">
                <thead>
                  <tr>
                    <th>Número de muestra</th>
                    <th>C. envases</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMuestra.detalles.map((det, i) => (
                    <tr key={i}>
                      <td>{det.numero}</td>
                      <td>{det.envases}</td>
                      <td>{det.descripcion}</td>
                      <td>
                        <span className="icon">📍</span>
                        <span className="icon">📝</span>
                        <span className="icon">📷</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="imagenes">
              <img src="https://via.placeholder.com/100" alt="muestra1" />
              <img src="https://via.placeholder.com/100" alt="muestra2" />
              <div className="img-add">+</div>
            </div>
          </>
        ) : (
          <p>Selecciona una muestra para ver los detalles.</p>
        )}
      </div>
    </div>
  );
}
