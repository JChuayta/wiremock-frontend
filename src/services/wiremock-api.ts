import axios from 'axios';
import { getProxyUrl } from '../config/api';
import type {
  WireMockMapping,
  WireMockMappingsResponse,
  WireMockRequestLog,
  WireMockRequestsResponse
} from '../types/wiremock';

// Configuración de la API
const API_BASE_URL = getProxyUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Mappings
export const mappingsApi = {
  // Obtener todos los mappings
  getAll: async (): Promise<WireMockMapping[]> => {
    const response = await api.get<WireMockMappingsResponse>('/__admin/mappings');
    return response.data.mappings;
  },

  // Obtener un mapping por ID
  getById: async (id: string): Promise<WireMockMapping> => {
    const response = await api.get<WireMockMapping>(`/__admin/mappings/${id}`);
    return response.data;
  },

  // Crear un nuevo mapping
  create: async (mapping: WireMockMapping): Promise<WireMockMapping> => {
    const response = await api.post<WireMockMapping>('/__admin/mappings', mapping);
    return response.data;
  },

  // Actualizar un mapping
  update: async (id: string, mapping: WireMockMapping): Promise<WireMockMapping> => {
    const response = await api.put<WireMockMapping>(`/__admin/mappings/${id}`, mapping);
    return response.data;
  },

  // Eliminar un mapping
  delete: async (id: string): Promise<void> => {
    await api.delete(`/__admin/mappings/${id}`);
  },

  // Eliminar todos los mappings
  deleteAll: async (): Promise<void> => {
    await api.delete('/__admin/mappings');
  },

  // Reset mappings
  reset: async (): Promise<void> => {
    await api.post('/__admin/mappings/reset');
  },

  // Save mappings
  save: async (): Promise<void> => {
    await api.post('/__admin/mappings/save');
  },
};

// Servicios para Requests (logs)
export const requestsApi = {
  // Obtener todos los requests
  getAll: async (): Promise<WireMockRequestLog[]> => {
    const response = await api.get<WireMockRequestsResponse>('/__admin/requests');
    return response.data.requests;
  },

  // Obtener un request por ID
  getById: async (id: string): Promise<WireMockRequestLog> => {
    const response = await api.get<WireMockRequestLog>(`/__admin/requests/${id}`);
    return response.data;
  },

  // Eliminar un request
  delete: async (id: string): Promise<void> => {
    await api.delete(`/__admin/requests/${id}`);
  },

  // Reset requests
  reset: async (): Promise<void> => {
    await api.post('/__admin/requests/reset');
  },
};

// Servicios generales
export const generalApi = {
  // Verificar si WireMock está funcionando
  health: async (): Promise<boolean> => {
    try {
      await api.get('/__admin');
      return true;
    } catch {
      return false;
    }
  },
};

export default api; 