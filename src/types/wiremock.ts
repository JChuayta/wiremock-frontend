// Tipos para la API de WireMock

export interface WireMockRequest {
  method: string;
  url?: string;
  urlPath?: string;
  urlPathPattern?: string;
  urlPattern?: string;
  headers?: Record<string, string>;
  queryParameters?: Record<string, string>;
  bodyPatterns?: Array<{
    equalTo?: string;
    caseInsensitive?: boolean;
  }>;
}

export interface WireMockResponse {
  status: number;
  statusMessage?: string;
  headers?: Record<string, string>;
  body?: string;
  jsonBody?: Record<string, unknown>;
  base64Body?: string;
  bodyFileName?: string;
  fixedDelayMilliseconds?: number;
  fault?: string;
}

export interface WireMockMapping {
  id?: string;
  uuid?: string;
  name?: string;
  request: WireMockRequest;
  response: WireMockResponse;
  persistent?: boolean;
  priority?: number;
  scenarioName?: string;
  requiredScenarioState?: string;
  newScenarioState?: string;
  metadata?: Record<string, unknown>;
}

export interface WireMockMappingsResponse {
  mappings: WireMockMapping[];
  meta: {
    total: number;
  };
}

export interface WireMockRequestLog {
  id: string;
  request: {
    url: string;
    absoluteUrl: string;
    method: string;
    clientIp: string;
    headers: Record<string, string>;
    cookies: Record<string, string>;
    body: string;
    loggedDate: number;
    loggedDateString: string;
  };
  responseDefinition: {
    status: number;
    fromConfiguredStub: boolean;
  };
}

export interface WireMockRequestsResponse {
  requests: WireMockRequestLog[];
  meta: {
    total: number;
  };
}

// Tipos para el estado de la aplicación
export interface AppState {
  mappings: WireMockMapping[];
  requests: WireMockRequestLog[];
  loading: boolean;
  error: string | null;
  selectedMapping: WireMockMapping | null;
}

// Tipos para las acciones
export type AppAction = 
  | { type: 'SET_MAPPINGS'; payload: WireMockMapping[] }
  | { type: 'SET_REQUESTS'; payload: WireMockRequestLog[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_MAPPING'; payload: WireMockMapping | null }
  | { type: 'ADD_MAPPING'; payload: WireMockMapping }
  | { type: 'UPDATE_MAPPING'; payload: WireMockMapping }
  | { type: 'DELETE_MAPPING'; payload: string }; 