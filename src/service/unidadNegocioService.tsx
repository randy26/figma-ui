import axios from "axios";

import { API_URL } from '../config/api.config';
export type UnidadNegocio = {
  idUnidadNegocio: number;
  nombre: string;
};

/**
 * Llama al backend para obtener la lista de unidades de negocio.
 * @returns Promise con la lista de unidades.
 */
export const obtenerUnidadesNegocio = async (): Promise<UnidadNegocio[]> => {
  const response = await axios.get<UnidadNegocio[]>(`${API_URL}/unidadNegocio/unidadesNegocio`);
  return response.data;
};
