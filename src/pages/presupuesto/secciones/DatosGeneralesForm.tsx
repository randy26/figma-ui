import styles from '../../../assets/styles/presupuesto/DatosGeneralesForm.module.css';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from "react";
import { obtenerMoneda } from "../../../service/MonedaService";
import type { Moneda } from "../../../service/MonedaService";
import { obtenerClientes } from "../../../service/ClienteService";
import type { Cliente } from "../../../model/Cliente";
import { obtenerDerivantes } from "../../../service/DerivanteService";
import type { Derivante } from "../../../model/Derivante";
import { obtenerContactos } from "../../../service/ContactoService";
import type { Contacto } from "../../../model/Contacto";
import { obtenerEmpleados } from "../../../service/EmpleadoService";
import type { Empleado } from "../../../model/Empleado";
import { obtenerUnidadesNegocio } from "../../../service/unidadNegocioService";
import type { UnidadNegocio } from "./../../../model/UnidadNegocio";

interface DatosGeneralesFormProps {
  isReadOnly?: boolean;
}

export default function DatosGeneralesForm({ isReadOnly = false }: DatosGeneralesFormProps) {
  const { register, setValue, watch, getValues } = useFormContext();
  const idUnidadNegocioSeleccionado = watch("unidadNegocio.idUnidadNegocio");
  const idContactoSeleccionado = watch("contacto.idContacto");
  const idClienteSeleccionado = watch("cliente.idCliente");
  const idMonedaSeleccionado = watch("moneda.idMoneda");
  const idDerivanteSeleccionado = watch("derivante.idDerivante");
  const idComercialSeleccionado = watch("comercial.idEmpleado");
  const idResponsableComercialSeleccionado = watch("responsableContrato.idEmpleado");
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [derivantes, setDerivantes] = useState<Derivante[]>([]);
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [unidades, setUnidades] = useState<UnidadNegocio[]>([]);

  useEffect(() => {
    const cargarYNormalizarDatos = async () => {
      try {
        const [
          monedasData,
          clientesData,
          derivantesData,
          contactosData,
          empleadosData,
          unidadnegociosData
        ] = await Promise.all([
          obtenerMoneda(),
          obtenerClientes(),
          obtenerDerivantes(),
          obtenerContactos(),
          obtenerEmpleados(),
          obtenerUnidadesNegocio()
        ]);

        setMonedas(monedasData);
        setClientes(clientesData);
        setDerivantes(derivantesData);
        setContactos(contactosData);
        setEmpleados(empleadosData);
        setUnidades(unidadnegociosData);

        const formValues = getValues();

        // Normalizar Cliente
        if (formValues.cliente?.idCliente) {
          const clienteSeleccionado = clientesData.find(
            c => String(c.idCliente) === String(formValues.cliente.idCliente)
          );
          if (clienteSeleccionado) {
            setValue("cliente.idCliente", String(clienteSeleccionado.idCliente), { shouldDirty: false });
            setValue("cliente.numeroCliente", clienteSeleccionado.numeroCliente?.toString() ?? "", { shouldDirty: false });
          }
        }

        // Normalizar Derivante
        if (formValues.derivante?.idDerivante) {
          const derivanteSeleccionado = derivantesData.find(
            d => String(d.idDerivante) === String(formValues.derivante.idDerivante)
          );
          if (derivanteSeleccionado) {
            setValue("derivante.idDerivante", String(derivanteSeleccionado.idDerivante), { shouldDirty: false });
            setValue("derivante.nroClienteDerivante", derivanteSeleccionado.numeroDerivante ?? "", { shouldDirty: false });
          }
        }

        // Normalizar Contacto
        if (formValues.contacto?.idContacto) {
          const contactoSeleccionado = contactosData.find(
            c => String(c.idContacto) === String(formValues.contacto.idContacto)
          );
          if (contactoSeleccionado) {
            setValue("contacto.idContacto", String(contactoSeleccionado.idContacto), { shouldDirty: false });
            setValue("contacto.emailContacto", contactoSeleccionado.email ?? "", { shouldDirty: false });
            setValue("contacto.telefonoContacto", contactoSeleccionado.telefono?.toString() ?? "", { shouldDirty: false });
          }
        }

        // Comercial, responsable y unidad de negocio
        setValue("comercial.idEmpleado", formValues.comercial?.idEmpleado ?? "", { shouldDirty: false });
        setValue("responsableContrato.idEmpleado", formValues.responsableContrato?.idEmpleado ?? "", { shouldDirty: false });
        setValue("unidadNegocio.idUnidadNegocio", formValues.unidadNegocio?.idUnidadNegocio ?? "", { shouldDirty: false });

// 👇 Normalizar fechas una vez
      setValue("fechaInicio", formatearFechaParaInput(formValues.fechaInicio));
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarYNormalizarDatos();
  }, []);

const formatearFechaParaInput = (fecha: string) => {
  const [dd, mm, yyyy] = fecha.split("/");
  return `${yyyy}-${mm}-${dd}`; // lo que espera el input date
};

  const handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isReadOnly) return;
    const clienteId = event.target.value;
    setValue("cliente.idCliente", clienteId);
    const clienteSeleccionado = clientes.find(c => String(c.idCliente) === clienteId);
    setValue("cliente.numeroCliente", clienteSeleccionado?.numeroCliente ?? "");
  };

  const handleDerivanteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isReadOnly) return;
    const derivanteId = event.target.value;
    const derivanteSeleccionado = derivantes.find(d => String(d.idDerivante) === derivanteId);
    setValue("derivante.nroClienteDerivante", derivanteSeleccionado?.numeroDerivante ?? "");
  };

  const handleContactoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isReadOnly) return;
    const contactoId = event.target.value;
    const contactoSeleccionado = contactos.find(c => String(c.idContacto) === contactoId);
    setValue("contacto.emailContacto", contactoSeleccionado?.email ?? "");
    setValue("contacto.telefonoContacto", contactoSeleccionado?.telefono?.toString() ?? "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.columns}>

        {/* Columna 1 */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label className="form-label">Unidad de negocios</label>
            <select {...register("unidadNegocio.idUnidadNegocio")} value={idUnidadNegocioSeleccionado || ""} className={styles.input} disabled={isReadOnly}>
              <option value="">Seleccione...</option>
              {unidades.map((u) => (
                <option key={u.idUnidadNegocio} value={u.idUnidadNegocio.toString()}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bpl" className="form-label">BPL</label>
            <input {...register("bpl")} type="checkbox" id="bpl" className={styles.checkboxBPL} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título</label>
            <input {...register("titulo")} type="text" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de presupuesto</label>
            <input {...register("fechaPresupuesto", {
    pattern: {
      value: /^\d{2}\/\d{2}\/\d{4}$/,
      message: "Formato inválido (dd/mm/yyyy)"
    }
  })} type="date" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Validez del presupuesto (días)</label>
            <input {...register("validezPresupuesto")} type="number" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de aceptación</label>
            <input {...register("fechaAceptacion")} type="date" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Duración del contrato (días)</label>
            <input {...register("duracionContrato")} type="number" className={styles.input} disabled={isReadOnly} />
          </div>
        </div>

        {/* Columna 2 */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de inicio</label>
            <input {...register("fechaInicio")} type="date" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Orden de compra</label>
            <input {...register("ordenCompra")} type="text" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Referencia</label>
            <input {...register("referencia")} type="text" className={styles.input} disabled={isReadOnly} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Cliente</label>
            <select {...register("cliente.idCliente")} value={idClienteSeleccionado || ""} className={styles.input} disabled={isReadOnly} onChange={handleClienteChange}>
              <option value="">Seleccione...</option>
              {clientes.map((c) => (
                <option key={c.idCliente} value={c.idCliente.toString()}>
                  {c.razonSocial}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Moneda</label>
            <select {...register("moneda.idMoneda")} className={styles.input} value={idMonedaSeleccionado || ""} disabled={isReadOnly}>
              <option value="">Seleccione...</option>
              {monedas.map((m) => (
                <option key={m.idMoneda} value={m.idMoneda.toString()}>
                  {m.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Derivante</label>
            <select {...register("derivante.idDerivante")} value={idDerivanteSeleccionado || ""} className={styles.input} disabled={isReadOnly} onChange={handleDerivanteChange}>
              <option value="">Seleccione...</option>
              {derivantes.map((d) => (
                <option key={d.idDerivante} value={d.idDerivante.toString()}>
                  {d.razonSocial}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nro. de Cliente</label>
            <input {...register("cliente.numeroCliente")} type="text" className={styles.input} readOnly />
          </div>
        </div>

        {/* Columna 3 */}
        <div className={styles.column}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nro. de Cliente Derivante</label>
            <input {...register("derivante.nroClienteDerivante")} type="text" className={styles.input} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Comercial</label>
            <select {...register("comercial.idEmpleado")} value={idComercialSeleccionado || ""} className={styles.input} disabled={isReadOnly}>
              <option value="">Seleccione...</option>
              {empleados.map((e) => (
                <option key={e.idEmpleado} value={e.idEmpleado.toString()}>
                  {e.nombre} {e.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Responsable del Contrato</label>
            <select {...register("responsableContrato.idEmpleado")} value={idResponsableComercialSeleccionado || ""} className={styles.input} disabled={isReadOnly}>
              <option value="">Seleccione...</option>
              {empleados.map((e) => (
                <option key={e.idEmpleado} value={e.idEmpleado.toString()}>
                  {e.nombre} {e.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Revisión</label>
            <input {...register("revision")} type="number" className={styles.input} disabled={isReadOnly} />
          </div>

          {/* CONTACTO */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Contacto</label>
            <select {...register("contacto.idContacto")} value={idContactoSeleccionado || ""} className={styles.input} disabled={isReadOnly} onChange={handleContactoChange}>
              <option value="">Seleccione...</option>
              {contactos.map((c) => (
                <option key={c.idContacto} value={c.idContacto.toString()}>
                  {c.nombre} {c.apellido}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email de contacto</label>
            <input {...register("contacto.emailContacto")} type="email" className={styles.input} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Teléfono de contacto</label>
            <input {...register("contacto.telefonoContacto")} type="tel" className={styles.input} readOnly />
          </div>
        </div>

      </div>
    </div>
  );
}
