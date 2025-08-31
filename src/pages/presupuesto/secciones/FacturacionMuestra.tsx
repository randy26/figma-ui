import '../../../assets/styles/presupuesto/facturacionMuestra.css';
import { useFormContext } from 'react-hook-form';

export default function FacturacionMuestra() {
  const { register, watch } = useFormContext();
  const condicionFacturacion = watch("condicionFacturacion");

  return (
    <div className="opciones-container">
      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoUltimaMuestra")}
          checked={condicionFacturacion?.autoUltimaMuestra || false}
        />
        Automáticamente apenas se termine la última muestra del contrato
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoIngresaronEntre")}
          checked={condicionFacturacion?.autoIngresaronEntre || false}
        />
        Automáticamente las que entraron entre el
        <input
          {...register("condicionFacturacion.fechaInicioIngreso")}
          type="date"
          value={condicionFacturacion?.fechaInicioIngreso || ""}
        />
        y el
        <input
          {...register("condicionFacturacion.fechaFinIngreso")}
          type="date"
          value={condicionFacturacion?.fechaFinIngreso || ""}
        />
        de cada mes
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoTerminadasEntre")}
          checked={condicionFacturacion?.autoTerminadasEntre || false}
        />
        Automáticamente las terminadas entre el
        <input
          {...register("condicionFacturacion.fechaInicioTerminada")}
          type="date"
          value={condicionFacturacion?.fechaInicioTerminada || ""}
        />
        y el
        <input
          {...register("condicionFacturacion.fechaFinTerminada")}
          type="date"
          value={condicionFacturacion?.fechaFinTerminada || ""}
        />
        de cada mes
      </label>

      <label className="opcion">
        <input
          type="radio"
          className="custom-radio"
          value="manual"
          {...register("condicionFacturacion.manual")}
          checked={condicionFacturacion?.manual === "manual"}
        />
        Manual
      </label>

      <label className="opcion">
        <input
          type="radio"
          className="custom-radio"
          value="muestra_a_muestra"
          {...register("condicionFacturacion.muestraAMuestra")}
          checked={condicionFacturacion?.muestraAMuestra === "muestra_a_muestra"}
        />
        Muestra a muestra
      </label>
    </div>
  );
}
