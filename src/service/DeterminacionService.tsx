import axios from "axios";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';
export type AbmDeterminacion = {
  idDeterminacion: number;
  nombreUnico: string;
  nombre: string;
  metodo: string;
  matriz: number;
  unidadPorDefecto: number;
  limiteDeCuantificacion: string;
  limiteDeDeteccion: string;
  incertidumbre: string;
  precioLocal: number;
  monedaLocal: number;
  precioExtranjero: number;
  monedaExtranjera: number;
};

export const obtenerDeterminacionesAbm = async (): Promise<AbmDeterminacion[]> => {
  const response = await axios.get<AbmDeterminacion[]>(`${API_URL}/AbmDeterminacion/listarAbmDeterminaciones`);
  return response.data;
};