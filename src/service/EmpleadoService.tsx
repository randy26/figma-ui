import { Empleado } from "../model/Empleado";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';

export const obtenerEmpleados = async (): Promise<Empleado[]> => {
  const response = await fetch(API_URL+"/api/empleado/empleados");
  return await response.json();
};