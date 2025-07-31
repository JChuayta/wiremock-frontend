import { useCallback, useReducer } from 'react';
import type { AppAction, AppState, WireMockMapping, WireMockRequestLog } from '../types/wiremock';

// Estado inicial
const initialState: AppState = {
  mappings: [],
  requests: [],
  loading: false,
  error: null,
  selectedMapping: null,
};

// Reducer para manejar las acciones
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_MAPPINGS':
      return { ...state, mappings: action.payload };
    
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SELECT_MAPPING':
      return { ...state, selectedMapping: action.payload };
    
    case 'ADD_MAPPING':
      return { ...state, mappings: [...state.mappings, action.payload] };
    
    case 'UPDATE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.map(mapping =>
          mapping.id === action.payload.id ? action.payload : mapping
        ),
      };
    
    case 'DELETE_MAPPING':
      return {
        ...state,
        mappings: state.mappings.filter(mapping => mapping.id !== action.payload),
      };
    
    default:
      return state;
  }
}

// Hook personalizado para usar el store
export function useAppStore() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Acciones para mappings
  const setMappings = useCallback((mappings: WireMockMapping[]) => {
    dispatch({ type: 'SET_MAPPINGS', payload: mappings });
  }, []);

  const addMapping = useCallback((mapping: WireMockMapping) => {
    dispatch({ type: 'ADD_MAPPING', payload: mapping });
  }, []);

  const updateMapping = useCallback((mapping: WireMockMapping) => {
    dispatch({ type: 'UPDATE_MAPPING', payload: mapping });
  }, []);

  const deleteMapping = useCallback((id: string) => {
    dispatch({ type: 'DELETE_MAPPING', payload: id });
  }, []);

  const selectMapping = useCallback((mapping: WireMockMapping | null) => {
    dispatch({ type: 'SELECT_MAPPING', payload: mapping });
  }, []);

  // Acciones para requests
  const setRequests = useCallback((requests: WireMockRequestLog[]) => {
    dispatch({ type: 'SET_REQUESTS', payload: requests });
  }, []);

  // Acciones para UI
  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  return {
    state,
    actions: {
      setMappings,
      addMapping,
      updateMapping,
      deleteMapping,
      selectMapping,
      setRequests,
      setLoading,
      setError,
    },
  };
} 