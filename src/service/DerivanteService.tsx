import { Derivante } from "../model/Derivante";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';

export async function obtenerDerivantes(): Promise<Derivante[]> {
  const response = await fetch(API_URL+"/api/derivante/derivantes");
  if (!response.ok) {
    throw new Error('Error al obtener derivantes');
  }
  return response.json();
}