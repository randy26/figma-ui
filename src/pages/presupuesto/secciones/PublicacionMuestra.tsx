import '../../../assets/styles/presupuesto/PublicacionMuestra.css';
import { useFormContext } from 'react-hook-form';

export default function PublicacionMuestra() {
  const { register, watch } = useFormContext();
  const condicionesPublicacion = watch("condicionesPublicacion"); // <--- watch aquí

  return (
    <div className="publicacion-container">
      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.autorizacionComercialPreviaDT")}
          checked={condicionesPublicacion?.autorizacionComercialPreviaDT || false}
        />
        Autorización Comercial previa firma Director Técnico
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.autorizacionComercial")}
          checked={condicionesPublicacion?.autorizacionComercial || false}
        />
        Con autorización Comercial
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.automaticamenteFirmaDT")}
          checked={condicionesPublicacion?.automaticamenteFirmaDT || false}
        />
        Automáticamente (inmediato firma Director Técnico)
      </label>

      <label className="opcion">
        <input
          type="checkbox"
          className="custom-checkbox"
          {...register("condicionesPublicacion.seInformaConReferencias")}
          checked={condicionesPublicacion?.seInformaConReferencias || false}
        />
        Se informa con referencias
      </label>
    </div>
  );
}
