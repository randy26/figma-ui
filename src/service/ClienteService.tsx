import axios from "axios";
import { Cliente } from "../model/Cliente";

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';

export const obtenerClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(API_URL+"/api/cliente/clientes");
  return response.json();
};

