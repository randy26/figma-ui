import type { Cliente } from "../model/Cliente";
import { API_URL } from '../config/api.config';

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(API_URL+"/cliente/clientes");
  return response.json();
};

