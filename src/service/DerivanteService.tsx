import type { Derivante } from "../model/Derivante";
import { API_URL } from '../config/api.config';

export async function obtenerDerivantes(): Promise<Derivante[]> {
  const response = await fetch(API_URL+"/derivante/derivantes");
  if (!response.ok) {
    throw new Error('Error al obtener derivantes');
  }
  return response.json();
}