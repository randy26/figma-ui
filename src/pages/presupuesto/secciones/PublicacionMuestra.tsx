import '../../../assets/styles/presupuesto/PublicacionMuestra.css';
import { useFormContext } from 'react-hook-form';

export default function PublicacionMuestra() {
  const { register } = useFormContext();

  return (
    <div className="publicacion-container">
      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          defaultChecked
          {...register("condicionesPublicacion.autorizacionComercialPreviaDT")}
        />
        Autorización Comercial previa firma Director Técnico
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.autorizacionComercial")}
        />
        Con autorización Comercial
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.automaticamenteFirmaDT")}
        />
        Automáticamente (inmediato firma Director Técnico)
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.seInformaConReferencias")}
        />
        Se informa con referencias
      </label>
    </div>
  );
}
