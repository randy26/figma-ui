import axios from "axios";
import { API_URL } from '../config/api.config';
export type AbmReferenciaNormativa = {
  idReferenciaNormativa : number;
  nombre: string;
};

/**
 * Llama al backend para obtener la lista de monedas.
 * @returns Promise con la lista de monedas.
 */
export const obtenerReferenciaNormativaAbm = async (): Promise<AbmReferenciaNormativa[]> => {
  const response = await axios.get<AbmReferenciaNormativa[]>(`${API_URL}/ReferenciaNormativa/listarReferencias`);
  return response.data;
};