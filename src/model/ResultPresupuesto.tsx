export interface ResultPresupuesto {
  idPresupuesto: number;
  bpl: string;
  titulo: string;
  fechaPresupuesto: string;
  validezDelPresupuesto?: string;
  fechaAceptacion?: string;
  duracionDelContrato?: number;
  fechaInicio?: string;
  ordenDeCompra?: string;
  referencia?: string;
  idEstadoPresupuesto?: number;
  estadoPresupuesto: boolean;
}
