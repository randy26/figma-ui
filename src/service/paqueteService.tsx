import axios from "axios";
import { API_URL } from '../config/api.config';
export type PaqueteAbm = {
  idPaquete : number;
  nombre: string;
  precioLista: number;
};

/**
 * Llama al backend para obtener la lista de monedas.
 * @returns Promise con la lista de monedas.
 */
export const obtenerPaquetesAbm = async (): Promise<PaqueteAbm[]> => {
  const response = await axios.get<PaqueteAbm[]>(`${API_URL}/Paquete/listPaquetes`);
  return response.data;
};
