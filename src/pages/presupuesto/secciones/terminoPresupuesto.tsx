import styles from '../../../assets/styles/presupuesto/DatosGeneralesForm.module.css';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';

export default function TerminoPresupuesto() {
  const { register, watch, setValue } = useFormContext();

  // Ahora el valor inicial es numérico (0 o 1)
  const estadoValue = watch("facturacion.modo", 0);
  const [toggleValue, setToggleValue] = useState<number>(estadoValue);

  useEffect(() => {
    setValue("facturacion.modo", toggleValue);
  }, [toggleValue, setValue]);

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        {/* Contenedor columna vertical para Motivo + Estado */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 280 }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Motivo</label>
            <input {...register("motivo")} type="text" className={styles.input} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Estado del Presupuesto</label>
            <label
              className="switch"
              style={{ display: 'inline-block', position: 'relative', width: 50, height: 28 }}
            >
              <input
                type="checkbox"
                {...register("modo")}
                checked={toggleValue === 1}
                onChange={(e) => setToggleValue(e.target.checked ? 1 : 0)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                className="slider"
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: toggleValue === 1 ? '#eb8e36ff' : '#ccc',
                  transition: '.4s',
                  borderRadius: 28,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  height: 22,
                  width: 22,
                  left: toggleValue === 1 ? 22 : 3,
                  bottom: 3,
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
