import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import TerminoPresupuesto from "./secciones/terminoPresupuesto";
import DatosGeneralesForm from "./secciones/DatosGeneralesForm";
import ViajesTable from "./secciones/ViajesTable";
import FacturacionMuestra from "./secciones/FacturacionMuestra";
import PublicacionMuestra from "./secciones/PublicacionMuestra";
import Item from "./secciones/item";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import "../../assets/styles/presupuesto/AltaPresupuesto.css";
import { PresupuestoService } from "../../service/PresupuestoService";

const pasos = [
  { key: "datosGenerales", label: "Datos Generales", icon: <FaChevronRight /> },
  { key: "items", label: "Ítems", icon: <FaChevronRight /> },
  { key: "viajes", label: "Viajes", icon: <FaChevronRight /> },
  { key: "facturacion", label: "Facturación", icon: <FaChevronRight /> },
  { key: "publicacion", label: "Publicación", icon: <FaChevronRight /> },
  { key: "terminacionContrato", label: "Terminación del Contrato", icon: <FaChevronRight /> },
];

export default function AltaPresupuestoTabs() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const modo = searchParams.get("modo"); // 'editar' | 'detalle'

  const [readonly, setReadonly] = useState(modo !== "editar");
  const [pasoActual, setPasoActual] = useState(0);
  const [datosPrecargados, setDatosPrecargados] = useState(false);

  const methods = useForm({
  defaultValues: {
    tipoPresupuesto: "",
    unidadNegocio: { idUnidadNegocio: "", nombre: "" },
    bpl: false,
    nombreCliente: "",
    fecha: "",
    publicacion: { autorizacionPrevia: false, conAutorizacion: false, automatica: false, conReferencias: false },
    titulo: "",
    fechaPresupuesto: "",
    validezPresupuesto: "",
    fechaAceptacion: "",
    duracionContrato: "",
    fechaInicio: "",
    ordenCompra: "",
    referencia: "",
    cliente: { idCliente: "", razonSocial: "", numeroCliente: "", cuit: "" },
    moneda: { idMoneda: "", nombre: "" },
    derivante: { idDerivante: "", razonSocial: "", nroClienteDerivante: "" },
    comercial: { idEmpleado: "", nombre: "", apellido: "", telefono: "", email: "", sectores: "", idRolEmpleado: "" },
    responsableContrato: { idEmpleado: "", nombre: "", apellido: "", telefono: "", email: "", sectores: "", idRolEmpleado: "" },
    revision: null,
    contacto: { idContacto: 0, idCliente: 0, nombre: "", apellido: "", telefono: 0, email: "", observacion: "" },
    items: [
      {
        id: "",
        titulo: "",
        referencia: "",
        matriz: "",
        pe: "",
        veces: 0,
        frecuencia: 0,
        muestras: 0,
        oos: false,
        roos: false,
        paquete: null,
        determinaciones: [
          {
            idDeterminacionPresupuesto: "",
            idMuestra: "",
            idDeterminacion: "",
            especificacion: "",
            limite: "",
            informa: false,
            condicionantes: "",
            dtoCantidad: 0,
            dtoArbitrario: 0,
            dtoCliente: 0,
            dtoPorcentaje: 0,
            precioLista: 0,
            precioFinal: 0,
            crudos: false,
            derivado: false,
            resultado: "",
            referencia: "",
            idUnidadDeterminacion: "",
            datosCrudos: false,
            idFti: "",
            idEstadoDeterminacion: ""
          }
        ],
        paquetes: [
          {
            idPaquete: "",
            dtoCantidad: 0,
            dtoArbitrario: 0,
            dtoCliente: 0,
            dtoPorcentaje: 0,
            precioLista: 0,
            precioFinal: 0
          }
        ],
        muestreos: [
          {
            idMuestreo: "",
            idMuestra: "",
            ubicacion: "",
            fechaEstimada: "",
            cantidadMinima: 0,
            idUnidadDeterminacion: "",
            muestreadores: "",
            tiempoTotal: 0,
            consumibles: "",
            precioMuestreo: 0
          }
        ],
        scrudos: false
      }
    ],
    viajes: [{
      id: 0,
      ubicacion: "",
      costoViaticos: "",
      cantidadViajes: "",
      trasladoKm: "",
      alojamientoDias: "",
      viaticosUnidades: "",
    } ],
    condicionFacturacion: {
    idCondicionFacturacion: null,
    autoUltimaMuestra: false,
    autoIngresaronEntre: false,
    fechaInicioIngreso: null,
    fechaFinIngreso: null,
    autoTerminadasEntre: false,
    fechaInicioTerminada: null,
    fechaFinTerminada: null,
    manual: false,
    muestraAMuestra: false,
    idPresupuesto: null
  },
    condicionesPublicacion: {
    autorizacionComercialPreviaDT: false,
    autorizacionComercial: false,
    automaticamenteFirmaDT: false,
    seInformaConReferencias: false
  },
  modo:false,
  motivo:"",
  }
});
 useEffect(() => {
  const cargarDatos = async () => {
    if (id) {
      try {
        const datos = await PresupuestoService.obtenerPresupuestoPorId(Number(id));
        methods.reset(datos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    } else {
      setReadonly(false);
    }
    setDatosPrecargados(true);
  };

  cargarDatos();
}, [id]); // solo depende de id

  const avanzar = () => pasoActual < pasos.length - 1 && setPasoActual(pasoActual + 1);
  const retroceder = () => pasoActual > 0 && setPasoActual(pasoActual - 1);

  const renderPaso = (key: string) => {
    switch (key) {
      case "datosGenerales": return <DatosGeneralesForm isReadOnly={readonly} />;
      case "items": return <Item isReadOnly={readonly} />;
      case "viajes": return <ViajesTable isReadOnly={readonly} />;
      case "facturacion": return <FacturacionMuestra isReadOnly={readonly} />;
      case "publicacion": return <PublicacionMuestra isReadOnly={readonly} />;
      case "terminacionContrato": return <TerminoPresupuesto isReadOnly={readonly} />;
      default: return null;
    }
  };

  const progreso = ((pasoActual + 1) / pasos.length) * 100;

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      if (id) {
        const resp = await PresupuestoService.actualizarPresupuesto(Number(id), data);
        alert("Presupuesto actualizado correctamente");
      } else {
        const resp = await PresupuestoService.enviarPresupuesto(data);
        alert("Presupuesto enviado correctamente");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Ocurrió un error al enviar el presupuesto");
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="tabs-container">
        <h2 className="consulta-title">
          <HiOutlineClipboardList style={{ marginRight: "0.5rem" }} />
          {id ? (readonly ? `Detalle Presupuesto #${id}` : `Editar Presupuesto #${id}`) : "Nuevo Presupuesto"}
        </h2>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progreso}%` }} />
          <span className="progress-label">{Math.round(progreso)}%</span>
        </div>

        <div className="tabs-header">
          {pasos.map((paso, i) => (
            <button
              key={paso.key}
              type="button"
              className={`tab-item ${pasoActual === i ? "active" : ""}`}
              onClick={() => setPasoActual(i)}
            >
              {paso.icon} {paso.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {datosPrecargados && renderPaso(pasos[pasoActual].key)}
        </div>

        {!readonly && (
          <div className="tabs-footer">
            <div className="button-group">
              {pasoActual > 0 && (
                <button type="button" className="slider-button" onClick={retroceder}>
                  Anterior
                </button>
              )}
              {pasoActual < pasos.length - 1 ? (
                <button type="button" className="slider-button primary" onClick={avanzar}>
                  Siguiente
                </button>
              ) : (
                <button type="submit" className="slider-button submit">
                  {id ? "Actualizar Presupuesto" : "Enviar Formulario"}
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
