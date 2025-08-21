import axios from "axios";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';
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
