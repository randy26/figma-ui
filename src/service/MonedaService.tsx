import axios from "axios";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';
export type Moneda = {
  idMoneda : number;
  nombre: string;
};

/**
 * Llama al backend para obtener la lista de monedas.
 * @returns Promise con la lista de monedas.
 */
export const obtenerMoneda = async (): Promise<Moneda[]> => {
  const response = await axios.get<Moneda[]>(`${API_URL}/Moneda/listMonedas`);
  return response.data;
};
