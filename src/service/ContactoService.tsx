import type { Contacto } from "../model/Contacto";
import { API_URL } from '../config/api.config';

export const obtenerContactos = async (): Promise<Contacto[]> => {
  const response = await fetch(API_URL + "/contacto/contactos");
  if (!response.ok) throw new Error("Error al obtener contactos");
  return await response.json();
};