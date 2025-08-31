import type { Empleado } from "../model/Empleado";
import { API_URL } from '../config/api.config';

export const obtenerEmpleados = async (): Promise<Empleado[]> => {
  const response = await fetch(API_URL+"/empleado/empleados");
  return await response.json();
};