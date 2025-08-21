import { Contacto } from "../model/Contacto";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';

export const obtenerContactos = async (): Promise<Contacto[]> => {
  const response = await fetch(API_URL + "/api/contacto/contactos");
  if (!response.ok) throw new Error("Error al obtener contactos");
  return await response.json();
};