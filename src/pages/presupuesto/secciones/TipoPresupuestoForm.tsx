import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import "../../../assets/styles/presupuesto/tipoPresupuesto.css";
import { obtenerUnidadesNegocio, UnidadNegocio } from "../../../service/unidadNegocioService";

export default function TipoPresupuestoForm() {
  const { register } = useFormContext();
  const [unidades, setUnidades] = useState<UnidadNegocio[]>([]);

  useEffect(() => {
    const cargarUnidades = async () => {
      try {
        const data = await obtenerUnidadesNegocio();
        setUnidades(data);
      } catch (error) {
        console.error("Error cargando unidades de negocio:", error);
      }
    };

    cargarUnidades();
  }, []);

  return (
    <div className="space-y-4">
      <div className="form-row">
        {/* UNIDAD DE NEGOCIOS */}
        <div className="form-column form-column-small">
          <label className="form-label">Unidad de negocios</label>
          <select {...register("unidadNegocio")} className="select-underline">
            <option value="">Seleccione...</option>
            {unidades.map((u) => (
              <option key={u.idUnidadNegocio} value={u.nombre}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* BPL */}
        <div className="form-column checkbox-wrapper">
          <div className="checkbox-inner">
            <input
              {...register("bpl")}
              type="checkbox"
              id="bpl"
              className="checkbox-underline"
            />
            <label htmlFor="bpl" className="form-label ml-2">
              BPL
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
