// Configuración centralizada de la API
export const API_CONFIG = {
  // URL base del servidor WireMock
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  
  // Endpoints de la API
  ENDPOINTS: {
    MAPPINGS: '/__admin/mappings',
    REQUESTS: '/__admin/requests',
    ADMIN: '/__admin',
  }
};

// Función helper para construir URLs absolutas
export const buildAbsoluteUrl = (relativeUrl: string): string => {
  return `${API_CONFIG.BASE_URL}${relativeUrl}`;
};

// Función helper para obtener la URL del proxy (para desarrollo)
export const getProxyUrl = (): string => {
  return import.meta.env.VITE_USE_PROXY === 'true' ? '/api' : API_CONFIG.BASE_URL;
}; 