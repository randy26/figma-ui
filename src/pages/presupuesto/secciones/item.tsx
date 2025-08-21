import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "../../../assets/styles/presupuesto/item.css";
import { obtenerPaquetesAbm, PaqueteAbm } from "../../../service/paqueteService";
import { obtenerReferenciaNormativaAbm, AbmReferenciaNormativa } from "../../../service/referenciaNormativaService";
import { obtenerMatrizAbm, AbmMatriz } from "../../../service/matrizService";
import { obtenerDeterminacionesAbm, AbmDeterminacion } from "../../../service/DeterminacionService";

export interface Determinacion {
  idDeterminacion: number;
  informa: boolean;
  condicionantes: boolean;
  dtoCantidad: number;
  dtoCliente: number;
  dtoArbitrario: number;
  dtoPorcentaje: number;
  precioLista: number;
  precioFinal: number;
  crudos: boolean;
  datosCrudos: boolean;
}

export interface Paquete {
  idPaquete: number;
  dtoCantidad: number;
  dtoArbitrario: number;
  dtoCliente: number;
  dtoPorcentaje: number;
  precioLista: number;
  precioFinal: number;
}

export interface Muestreo {
  idMuestreo: number;
  ubicacion: number;
  fechaEstimada: string;
  cantidadMinima: number;
  unidad: string;
  muestreadores: string;
  tiempoTotal: number;
  consumibles: number;
  precioMuestreo: number;
}

export interface Item {
  id: number;
  titulo: string;
  referencia: number | string;
  matriz: number | string;
  pe: number;
  veces: number;
  frecuencia: number;
  muestras: number;
  oos: boolean;
  roos: boolean;
  sCrudos: boolean;
  paquete: string;
  determinaciones: Determinacion[];
  paquetes: Paquete[];
  muestreos: Muestreo[];
}

const ItemsTable = () => {
  const { setValue, register, watch } = useFormContext();
  const items = watch("items"); // ya tenemos los items del form

  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingDetIds, setEditingDetIds] = useState<Record<string, boolean>>({});
  const [accionSeleccionada, setAccionSeleccionada] = useState<string>("");

  const [paquetes, setPaquetes] = useState<PaqueteAbm[]>([]);
  const [referenciasNormativas, setReferenciaNormativas] = useState<AbmReferenciaNormativa[]>([]);
  const [Matrices, setMatriz] = useState<AbmMatriz[]>([]);
  const [determinaciones, setDeterminaciones] = useState<AbmDeterminacion[]>([]);

  useEffect(() => {
    register("items"); // registrar items en el form

    const fetchPresupuestos = async () => {
      try {
        const [paquetesData, MatrizData, referenciasNormativasData, determinacionesData] = await Promise.all([
          obtenerPaquetesAbm(),
          obtenerMatrizAbm(),
          obtenerReferenciaNormativaAbm(),
          obtenerDeterminacionesAbm()
        ]);

        setPaquetes(paquetesData);
        setMatriz(MatrizData);
        setReferenciaNormativas(referenciasNormativasData);
        setDeterminaciones(determinacionesData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchPresupuestos();
  }, [register]);

  // ---------------- Handlers ----------------

  const toggleExpand = (id: number) => {
    setExpandedItemId(expandedItemId === id ? null : id);
    setAccionSeleccionada("");
  };

  const toggleEditItem = (itemId: number) => {
    setEditingItemId(editingItemId === itemId ? null : itemId);
  };

  const toggleEditDet = (itemId: number, detIndex: number, tipo: string) => {
    const key = `${tipo}-${itemId}-${detIndex}`;
    setEditingDetIds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addDeterminacionTipo = (
    itemId: number,
    tipo: "determinaciones" | "paquetes" | "muestreos"
  ) => {
    const nuevaDet: any =
      tipo === "determinaciones"
        ? { idDeterminacion: 0, informa: false, condicionantes: false, dtoCantidad: 0, dtoCliente: 0, dtoArbitrario: 0, dtoPorcentaje: 0, precioLista: 0, precioFinal: 0, crudos: false, datosCrudos: false }
        : tipo === "paquetes"
        ? { idPaquete: 0, dtoCantidad: 0, dtoArbitrario: 0, dtoCliente: 0, dtoPorcentaje: 0, precioLista: 0, precioFinal: 0 }
        : { idMuestreo: 0, ubicacion: 0, fechaEstimada: "", cantidadMinima: 0, unidad: "", muestreadores: "", tiempoTotal: 0, consumibles: 0, precioMuestreo: 0 };

    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, [tipo]: [...item[tipo], nuevaDet] } : item
    );
    setValue("items", updatedItems);
  };

  const removeDeterminacionTipo = (
    itemId: number,
    index: number,
    tipo: "determinaciones" | "paquetes" | "muestreos"
  ) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, [tipo]: item[tipo].filter((_: any, i: number) => i !== index) }
        : item
    );
    setValue("items", updatedItems);
  };

  const handleChangeItem = (id: number, field: keyof Item, value: any) => {
    const updatedItems = items.map((it) => (it.id === id ? { ...it, [field]: value } : it));
    setValue("items", updatedItems);
  };

  const handleChangeDet = (
    itemId: number,
    index: number,
    field: keyof Determinacion,
    value: any,
    tipo: "determinaciones" | "muestreos"
  ) => {
    const updatedItems = items.map((it) =>
      it.id === itemId
        ? {
            ...it,
            [tipo]: it[tipo].map((d: any, i: number) => (i === index ? { ...d, [field]: value } : d)),
          }
        : it
    );
    setValue("items", updatedItems);
  };

  const handleChangePaquete = (
    itemId: number,
    index: number,
    field: string,
    value: number
  ) => {
    const updatedItems = items.map((item) => {
      if (item.id !== itemId) return item;
      const updatedPaquetes = item.paquetes.map((d: any, i: number) => {
        if (i !== index) return d;
        let updated = { ...d, [field]: value };
        if (field === "idPaquete") {
          const paqueteSeleccionado = paquetes.find((p) => p.idPaquete === value);
          updated = { ...updated, precioLista: paqueteSeleccionado?.precioLista ?? 0 };
        }
        return updated;
      });
      return { ...item, paquetes: updatedPaquetes };
    });
    setValue("items", updatedItems);
  };
const handleChangeMuestreo = (
  itemId: number,
  index: number,
  field: keyof Muestreo,
  value: any
) => {
  const updatedItems = items.map((it) =>
    it.id === itemId
      ? {
          ...it,
          muestreos: it.muestreos.map((d, i) =>
            i === index ? { ...d, [field]: value } : d
          ),
        }
      : it
  );
  setValue("items", updatedItems);
};
  const removeItem = (id: number) => {
    const updatedItems = items.filter((i: any) => i.id !== id);
    setValue("items", updatedItems);
  };
  return (
    <div className="items-container">
      <div className="items-header">
        <span className="header-title">Ítems</span>
        <button  type="button"
          className="new-item-btn"
          onClick={() => {
            const newId = items.length + 1;
            setItems([
              ...items,
              {
                id: newId,
                titulo: `Nuevo Ítem ${newId}`,
                referencia: "",
                matriz: "",
                pe: 0,
                veces: 0,
                frecuencia: 0,
                muestras: 0,
                oos: false,
                roos: false,
                sCrudos: false,
                paquete: "",
                determinaciones: [],
                paquetes: [],
                muestreos: [],
              },
            ]);
          }}
        >
          Nuevo Ítem
        </button>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th></th>
            <th>Título</th>
            <th>Referencia normativa</th>
            <th>Matriz</th>
            <th>P.E.</th>
            <th>Q. veces</th>
            <th>Frecuencia</th>
            <th>Q. muestras</th>
            <th>OOS</th>
            <th>R.OOS</th>
            <th>S. Crudos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td>
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.id)}
                    className="expand-btn"
                  >
                    {expandedItemId === item.id ? "−" : "+"}
                  </button>
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text" 
                      value={item.titulo}
                      onChange={(e) =>
                        handleChangeItem(item.id, "titulo", e.target.value)
                      }
                    />
                  ) : (
                    item.titulo
                  )}
                </td>
                <td>
  {editingItemId === item.id ? (
    <select
      value={item.referencia ?? ""}
      onChange={(e) =>
        handleChangeItem(item.id, "referencia", Number(e.target.value))
      }
    >
      <option value="">Seleccione...</option>
      {referenciasNormativas.map((ref) => (
        <option
          key={ref.idReferenciaNormativa}
          value={ref.idReferenciaNormativa}
        >
          {ref.nombre}
        </option>
      ))}
    </select>
  ) : (
    referenciasNormativas.find(
      (ref) => ref.idReferenciaNormativa === item.referencia
    )?.nombre || ""
  )}
</td>

                  {/* Matriz */}
                  <td>
                    {editingItemId === item.id ? (
                      <select
                        value={item.matriz || ""}
                        onChange={(e) =>
                          handleChangeItem(item.id, "matriz", Number(e.target.value))
                        }
                      >
                        <option value="">Seleccione...</option>
                        {Matrices.map((mat) => (
                          <option key={mat.idMatriz} value={mat.idMatriz}>
                            {mat.nombre}
                          </option>
                        ))}
                      </select>
                    ) : (
                      Matrices.find((mat) => mat.idMatriz === item.matriz)?.nombre || ""
                    )}
                  </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={item.pe}
                      onChange={(e) =>
                        handleChangeItem(item.id, "pe", Number(e.target.value))
                      }
                    />
                  ) : (
                    item.pe
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={item.veces}
                      onChange={(e) =>
                        handleChangeItem(item.id, "veces", Number(e.target.value))
                      }
                    />
                  ) : (
                    item.veces
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={item.frecuencia}
                      onChange={(e) =>
                        handleChangeItem(
                          item.id,
                          "frecuencia",
                          Number(e.target.value)
                        )
                      }
                    />
                  ) : (
                    item.frecuencia
                  )}
                </td>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="number"
                      value={item.muestras}
                      onChange={(e) =>
                        handleChangeItem(
                          item.id,
                          "muestras",
                          Number(e.target.value)
                        )
                      }
                    />
                  ) : (
                    item.muestras
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.oos}
                    onChange={(e) =>
                      handleChangeItem(item.id, "oos", e.target.checked)
                    }
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.roos}
                    onChange={(e) =>
                      handleChangeItem(item.id, "roos", e.target.checked)
                    }
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.sCrudos}
                    onChange={(e) =>
                      handleChangeItem(item.id, "sCrudos", e.target.checked)
                    }
                    disabled={editingItemId !== item.id}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => toggleEditItem(item.id)}
                    className="edit-btn"
                  >
                    {editingItemId === item.id ? "💾" : "✏️"}
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>

              {expandedItemId === item.id && (
                <tr>
                  <td colSpan={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <select
                        className="input"
                        value={accionSeleccionada}
                        onChange={(e) => setAccionSeleccionada(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="nueva-determinacion">
                          Nueva Determinación
                        </option>
                        <option value="nuevo-paquete">Nuevo Paquete</option>
                        <option value="nuevo-muestreo">Nuevo Muestreo</option>
                      </select>

                      {accionSeleccionada === "nueva-determinacion" && (
                        <button type="button"
                          className="badge orange"
                          onClick={() =>
                            addDeterminacionTipo(item.id, "determinaciones")
                          }
                        >
                          Nueva Determinación
                        </button>
                      )}
                      {accionSeleccionada === "nuevo-paquete" && (
                        <button type="button"
                          className="badge yellow"
                          onClick={() =>
                            addDeterminacionTipo(item.id, "paquetes")
                          }
                        >
                          Nuevo Paquete
                        </button>
                      )}
                      {accionSeleccionada === "nuevo-muestreo" && (
                        <button type="button"
                          className="badge gray"
                          onClick={() =>
                            addDeterminacionTipo(item.id, "muestreos")
                          }
                        >
                          Nuevo Muestreo
                        </button>
                      )}
                    </div>

                    {/* Tabla de determinaciones */}
                    {accionSeleccionada === "nueva-determinacion" && (
                      <table className="determinaciones-table">
                        <thead>
                          <tr>
                            <th>Determinación</th>
                            <th>Informa</th>
                            <th>Cond.</th>
                            <th>DtoQ</th>
                            <th>DtoC</th>
                            <th>DtoA</th>
                            <th>Dto%</th>
                            <th>PLista</th>
                            <th>PFinal</th>
                            <th>Crudos</th>
                            <th>Datos Crudos</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.determinaciones.map((d, i) => {
                            const key = `determinaciones-${item.id}-${i}`;
                            const isEditing = editingDetIds[key];
                            return (
                              <tr key={key}>
                               <td>
                                  {isEditing ? (
                                    <select
                                      value={d.idDeterminacion || ""}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "idDeterminacion",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    >
                                      <option value="">Seleccione...</option>
                                      {determinaciones.map((det) => (
                                        <option key={det.idDeterminacion} value={det.idDeterminacion}>
                                          {det.nombre}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    // Cuando no está en edición, mostramos el nombre en vez del ID
                                    determinaciones.find((det) => det.idDeterminacion === d.idDeterminacion)
                                      ?.nombre || d.idDeterminacion
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={d.informa}
                                    onChange={(e) =>
                                      handleChangeDet(
                                        item.id,
                                        i,
                                        "informa",
                                        e.target.checked,
                                        "determinaciones"
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={d.condicionantes}
                                    onChange={(e) =>
                                      handleChangeDet(
                                        item.id,
                                        i,
                                        "condicionantes",
                                        e.target.checked,
                                        "determinaciones"
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoCantidad}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "dtoCantidad",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoCantidad
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoCliente}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "dtoCliente",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoCliente
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoArbitrario}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "dtoArbitrario",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoArbitrario
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoPorcentaje}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "dtoPorcentaje",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoPorcentaje
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.precioLista}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "precioLista",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.precioLista
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.precioFinal}
                                      onChange={(e) =>
                                        handleChangeDet(
                                          item.id,
                                          i,
                                          "precioFinal",
                                          Number(e.target.value),
                                          "determinaciones"
                                        )
                                      }
                                    />
                                  ) : (
                                    d.precioFinal
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={d.crudos}
                                    onChange={(e) =>
                                      handleChangeDet(
                                        item.id,
                                        i,
                                        "crudos",
                                        e.target.checked,
                                        "determinaciones"
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={d.datosCrudos}
                                    onChange={(e) =>
                                      handleChangeDet(
                                        item.id,
                                        i,
                                        "datosCrudos",
                                        e.target.checked,
                                        "determinaciones"
                                      )
                                    }
                                    disabled={!isEditing}
                                  />
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="edit-btn"
                                    onClick={() =>
                                      toggleEditDet(item.id, i, "determinaciones")
                                    }
                                  >
                                    {isEditing ? "💾" : "✏️"}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                      removeDeterminacionTipo(
                                        item.id,
                                        i,
                                        "determinaciones"
                                      )
                                    }
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}

                    {/* Tabla de paquetes */}
                    {accionSeleccionada === "nuevo-paquete" && (
                      <table className="paquete-table">
                        <thead>
                          <tr>
                            <th>Paquete</th>
                            <th>Dto Cant.</th>
                            <th>Dto Arb.</th>
                            <th>Dto Cli.</th>
                            <th>Dto %</th>
                            <th>Precio Lista</th>
                            <th>Precio Final</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.paquetes.map((d, i) => {
                            const key = `paquetes-${item.id}-${i}`;
                            const isEditing = editingDetIds[key];
                            return (
                              <tr key={key}>
                                <td>
                                  {isEditing ? (
                                    <select
                                      value={d.idPaquete || ""}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "idPaquete",
                                          Number(e.target.value)
                                        )
                                      }
                                    >
                                      <option value="">Seleccione...</option>
                                      {paquetes.map((u) => (
                                        <option key={u.idPaquete} value={u.idPaquete}>
                                          {u.nombre}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    paquetes.find((p) => p.idPaquete === d.idPaquete)?.nombre || ""
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoCantidad}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "dtoCantidad",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoCantidad
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoArbitrario}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "dtoArbitrario",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoArbitrario
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoCliente}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "dtoCliente",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoCliente
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.dtoPorcentaje}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "dtoPorcentaje",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.dtoPorcentaje
                                  )}
                                </td>
                                <td>
                                    {isEditing ? (
                                      <input
                                        type="number"
                                        value={d.precioLista}
                                        readOnly // se autocompleta desde idPaquete
                                      />
                                    ) : (
                                      d.precioLista
                                    )}
                              </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.precioFinal}
                                      onChange={(e) =>
                                        handleChangePaquete(
                                          item.id,
                                          i,
                                          "precioFinal",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.precioFinal
                                  )}
                                </td>
                                <td>
                                  <button
                                   type="button"
                                    className="edit-btn"
                                    onClick={() =>
                                      toggleEditDet(item.id, i, "paquetes")
                                    }
                                  >
                                    {isEditing ? "💾" : "✏️"}
                                  </button>
                                  <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={() =>
                                      removeDeterminacionTipo(item.id, i, "paquetes")
                                    }
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}

                    {/* Tabla de muestreos */}
                    {accionSeleccionada === "nuevo-muestreo" && (
                      <table className="muestreos-table">
                        <thead>
                          <tr>
                            <th>Ubicación</th>
                            <th>F. Estimada</th>
                            <th>Cant. mínima</th>
                            <th>Unidad</th>
                            <th>Muestreadores</th>
                            <th>tiempo total</th>
                            <th>Consumibles</th>
                            <th>Precio Muestreo</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.muestreos.map((d, i) => {
                            const key = `muestreos-${item.id}-${i}`;
                            const isEditing = editingDetIds[key];
                            return (
                              <tr key={key}>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.ubicacion}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "ubicacion",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.ubicacion
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.fechaEstimada}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "fechaEstimada",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.fechaEstimada
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.cantidadMinima}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "cantidadMinima",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.cantidadMinima
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.unidad}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "unidad",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.unidad
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.muestreadores}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "muestreadores",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.muestreadores
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.tiempoTotal}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "tiempoTotal",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.tiempoTotal
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.consumibles}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "consumibles",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.consumibles
                                  )}
                                </td>
                                <td>
                                  {isEditing ? (
                                    <input
                                      type="number"
                                      value={d.precioMuestreo}
                                      onChange={(e) =>
                                        handleChangeMuestreo(
                                          item.id,
                                          i,
                                          "precioMuestreo",
                                          Number(e.target.value)
                                        )
                                      }
                                    />
                                  ) : (
                                    d.precioMuestreo
                                  )}
                                </td>
                                <td>
                                  <button
                                    className="edit-btn" type="button"
                                    onClick={() =>
                                      toggleEditDet(item.id, i, "muestreos")
                                    }
                                  >
                                    {isEditing ? "💾" : "✏️"}
                                  </button>
                                  <button
                                    className="delete-btn" type="button"
                                    onClick={() =>
                                      removeDeterminacionTipo(
                                        item.id,
                                        i,
                                        "muestreos"
                                      )
                                    }
                                  >
                                    🗑️
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
