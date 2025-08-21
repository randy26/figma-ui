// src/services/PresupuestoService.tsx
import axios from 'axios';

const API_URL = 'https://proana-1075540947695.us-central1.run.app/api';

export const PresupuestoService = {
  /**
   * Envía los datos del presupuesto a la API por POST.
   * @param data - Objeto con los datos del formulario.
   * @returns La respuesta del servidor o lanza un error.
   */
  enviarPresupuesto: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/presupuestos/nuevoPresupuesto`, data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error al enviar presupuesto:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error de conexión con la API.");
      } else {
        throw new Error("Error inesperado al enviar el presupuesto.");
      }
    }
  },

  /**
   * Obtiene la lista de presupuestos desde la API.
   * @returns Array de presupuestos.
   */
  obtenerPresupuestos: async () => {
    try {
      const response = await axios.get(`${API_URL}/presupuestos/presupuestos`);
      return response.data;
    } catch (error: any) {
      console.error("❌ Error al obtener presupuestos:", error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error de conexión con la API.");
      } else {
        throw new Error("Error inesperado al obtener los presupuestos.");
      }
    }
  },

  /**
   * Obtiene un presupuesto por su id.
   * @param id - ID del presupuesto.
   * @returns Datos del presupuesto.
   */
  obtenerPresupuestoPorId: async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/presupuestos/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al obtener presupuesto ${id}:`, error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error de conexión con la API.");
      } else {
        throw new Error("Error inesperado al obtener el presupuesto.");
      }
    }
  },

  /**
   * Actualiza un presupuesto existente.
   * @param id - ID del presupuesto.
   * @param data - Datos para actualizar.
   * @returns Presupuesto actualizado.
   */
  actualizarPresupuesto: async (id: number, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/presupuestos/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`❌ Error al actualizar presupuesto ${id}:`, error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Error de conexión con la API.");
      } else {
        throw new Error("Error inesperado al actualizar el presupuesto.");
      }
    }
  },

  
};
