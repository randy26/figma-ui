import axios from "axios";
import { API_URL } from '../config/api.config';
export type AbmMatriz = {
  idMatriz : number;
  nombre: string;
};

export const obtenerMatrizAbm = async (): Promise<AbmMatriz[]> => {
  const response = await axios.get<AbmMatriz[]>(`${API_URL}/Matriz/listarMatrices`);
  return response.data;
};