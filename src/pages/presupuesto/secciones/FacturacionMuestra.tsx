import '../../../assets/styles/presupuesto/facturacionMuestra.css';
import { useFormContext } from 'react-hook-form';

export default function FacturaciónMuestra() {
  const { register,watch } = useFormContext();

  return (
    <div className="opciones-container">
      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoUltimaMuestra")}
        />
        Automáticamente apenas se termine la última muestra del contrato
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoIngresaronEntre")}
        />
        Automáticamente las que entraron entre el
        <input {...register("condicionFacturacion.fechaInicioIngreso", {
          pattern: {
            value: /^\d{2}\/\d{2}\/\d{4}$/,
            message: "Formato inválido (dd/mm/yyyy)"
          }
        })} type="date"/>
        y el
        <input {...register("condicionFacturacion.fechaFinIngreso", {
          pattern: {
            value: /^\d{2}\/\d{2}\/\d{4}$/,
            message: "Formato inválido (dd/mm/yyyy)"
          }
        })} type="date"/>
        de cada mes
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionFacturacion.autoTerminadasEntre")}
        />
        Automáticamente las terminadas entre el
        <input {...register("condicionFacturacion.fechaInicioTerminada", {
          pattern: {
            value: /^\d{2}\/\d{2}\/\d{4}$/,
            message: "Formato inválido (dd/mm/yyyy)"
          }
        })} type="date"/>
        y el
      <input {...register("condicionFacturacion.fechaFinTerminada", {
          pattern: {
            value: /^\d{2}\/\d{2}\/\d{4}$/,
            message: "Formato inválido (dd/mm/yyyy)"
          }
        })} type="date"/>
        de cada mes
      </label>

      <label className="opcion">
  <input
    type="radio"
    className="custom-radio"
    value="manual"
    {...register("condicionFacturacion.manual")}
    defaultChecked
  />
  Manual
</label>

<label className="opcion">
  <input
    type="radio"
    className="custom-radio"
    value="muestra_a_muestra"
    {...register("condicionFacturacion.muestraAMuestra")}
  />
  Muestra a muestra
</label>
    </div>
  );
}
