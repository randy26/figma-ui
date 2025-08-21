import axios from "axios";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';
export type AbmMatriz = {
  idMatriz : number;
  nombre: string;
};

export const obtenerMatrizAbm = async (): Promise<AbmMatriz[]> => {
  const response = await axios.get<AbmMatriz[]>(`${API_URL}/Matriz/listarMatrices`);
  return response.data;
};