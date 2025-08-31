import "../../../assets/styles/presupuesto/ViajesTable.css";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";
//import { Viaje } from "../../AltaPresupuestoTabs";
export type Viaje = {
  id: number;
  ubicacion: string;
  costoViaticos: string;
  cantidadViajes: string;
  trasladoKm: string;
  alojamientoDias: string;
  viaticosUnidades: string;
};
interface Props {
  isReadOnly?: boolean;
}

export default function ViajesTable({ isReadOnly = false }: Props) {
  const { setValue, register, watch } = useFormContext<{ viajes: Viaje[] }>();
const [editandoId, setEditandoId] = useState<number | null>(null); // <-- así
  register("viajes"); // registrar items en el form

  const viajes = watch("viajes") || [];
  //const [editandoId, setEditandoId] = useFormContext<number | null>(null);

  const handleInputChange = (id: number, field: keyof Viaje, value: string) => {
    const nuevosViajes = viajes.map(v => (v.id === id ? { ...v, [field]: value } : v));
    setValue("viajes", nuevosViajes);
  };

  const handleEliminar = (id: number) => {
    setValue("viajes", viajes.filter(v => v.id !== id));
  };

  const handleNuevoViaje = () => {
    const newId = viajes.length > 0 ? Math.max(...viajes.map(v => v.id)) + 1 : 1;
    const nuevoViaje: Viaje = {
      id: newId,
      ubicacion: "",
      costoViaticos: "",
      cantidadViajes: "",
      trasladoKm: "",
      alojamientoDias: "",
      viaticosUnidades: "",
    };
    setValue("viajes", [...viajes, nuevoViaje]);
    setEditandoId(newId);
  };

  const toggleEdicion = (id: number) => {
    if (editandoId === id) {
      const viaje = viajes.find(v => v.id === id);
      if (
        !viaje?.ubicacion.trim() ||
        !viaje?.costoViaticos.trim() ||
        !viaje?.cantidadViajes.trim() ||
        !viaje?.trasladoKm.trim() ||
        !viaje?.alojamientoDias.trim() ||
        !viaje?.viaticosUnidades.trim()
      ) {
        alert("Todos los campos son obligatorios.");
        return;
      }
      setEditandoId(null);
    } else {
      setEditandoId(id);
    }
  };

  return (
    <div className="container">
      <div className="tableContainer">
        <table className="viajesTable">
          <thead>
            <tr>
              <th>Ubicación</th>
              <th>Costo de viáticos por viaje</th>
              <th>Cantidad de viajes por contrato</th>
              <th>Traslado (Km)</th>
              <th>Alojamiento (Días)</th>
              <th>Viáticos (Unidades)</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map(viaje => (
              <tr key={viaje.id}>
                <td>
                  <input
                    type="text"
                    className="input"
                    value={viaje.ubicacion}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "ubicacion", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={viaje.costoViaticos}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "costoViaticos", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={viaje.cantidadViajes}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "cantidadViajes", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={viaje.trasladoKm}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "trasladoKm", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={viaje.alojamientoDias}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "alojamientoDias", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input"
                    value={viaje.viaticosUnidades}
                    disabled={editandoId !== viaje.id || isReadOnly}
                    onChange={e => handleInputChange(viaje.id, "viaticosUnidades", e.target.value)}
                  />
                </td>
                <td className="acciones">
                  {!isReadOnly && (
                    <>
                      <button onClick={() => toggleEdicion(viaje.id)} title={editandoId === viaje.id ? "Guardar" : "Editar"}>
                        {editandoId === viaje.id ? <FaSave color="#16a34a" /> : <FaEdit color="#2563eb" />}
                      </button>
                      <button onClick={() => handleEliminar(viaje.id)} title="Eliminar">
                        <FaTrash color="#dc2626" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isReadOnly && (
        <div style={{ textAlign: "right" }}>
          <button className="btnAgregar" onClick={handleNuevoViaje}>
            Nuevo Viaje
          </button>
        </div>
      )}
    </div>
  );
}
