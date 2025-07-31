import { ArrowLeft, Copy, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { mappingsApi } from '../services/wiremock-api';
import { useAppStore } from '../store/app-store';
import type { WireMockMapping } from '../types/wiremock';
import './ViewMappingPage.css';

export default function ViewMappingPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, actions } = useAppStore();
  const [mapping, setMapping] = useState<WireMockMapping | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMapping();
    }
  }, [id]);

  const loadMapping = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const mappingData = await mappingsApi.getById(id);
      console.log('Mapping cargado:', mappingData);
      setMapping(mappingData);
    } catch (error) {
      actions.setError('Error al cargar el mapping');
      console.error('Error loading mapping:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!mapping?.id || !confirm('¿Estás seguro de que quieres eliminar este mapping?')) {
      return;
    }

    try {
      await mappingsApi.delete(mapping.id);
      actions.deleteMapping(mapping.id);
      navigate('/');
    } catch (error) {
      actions.setError('Error al eliminar el mapping');
      console.error('Error deleting mapping:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body text-center">
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mapping) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body text-center">
            <p>Mapping no encontrado</p>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Debug: mostrar información del response
  console.log('Response body:', mapping.response.body);
  console.log('Response headers:', mapping.response.headers);
  console.log('Response status:', mapping.response.status);

  return (
    <div className="container">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-secondary">
            <ArrowLeft size={16} />
            Volver
          </Link>
          <h1>Detalles del Mapping</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/edit/${mapping.id}`} className="btn btn-primary">
            <Edit size={16} />
            Editar
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>

      {state.error && (
        <div className="alert alert-error">
          {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información General */}
        <div className="card">
          <div className="card-header">
            <h2>Información General</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">ID</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{mapping.id}</span>
                  <button
                    onClick={() => copyToClipboard(mapping.id || '')}
                    className="btn btn-sm btn-secondary"
                    title="Copiar ID"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              {mapping.uuid && mapping.uuid !== mapping.id && (
                <div>
                  <label className="form-label">UUID</label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">{mapping.uuid}</span>
                    <button
                      onClick={() => copyToClipboard(mapping.uuid || '')}
                      className="btn btn-sm btn-secondary"
                      title="Copiar UUID"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              )}
              <div>
                <label className="form-label">Nombre</label>
                <p>{mapping.name || 'Sin nombre'}</p>
              </div>
              <div>
                <label className="form-label">Prioridad</label>
                <p>{mapping.priority || 'Normal'}</p>
              </div>
              <div>
                <label className="form-label">Persistente</label>
                <p>{mapping.persistent ? 'Sí' : 'No'}</p>
              </div>
              {mapping.scenarioName && (
                <div>
                  <label className="form-label">Escenario</label>
                  <p>{mapping.scenarioName}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Request */}
        <div className="card">
          <div className="card-header">
            <h2>Request</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label className="form-label">Método</label>
                <span className={`badge ${getMethodBadgeClass(mapping.request.method)}`}>
                  {mapping.request.method}
                </span>
              </div>
              <div>
                <label className="form-label">URL</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    {mapping.request.urlPath || mapping.request.url || 'N/A'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(mapping.request.urlPath || mapping.request.url || '')}
                    className="btn btn-sm btn-secondary"
                    title="Copiar URL"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              {mapping.request.headers && Object.keys(mapping.request.headers).length > 0 && (
                <div>
                  <label className="form-label">Headers</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(mapping.request.headers, null, 2)}</pre>
                  </div>
                </div>
              )}
              {mapping.request.queryParameters && Object.keys(mapping.request.queryParameters).length > 0 && (
                <div>
                  <label className="form-label">Query Parameters</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(mapping.request.queryParameters, null, 2)}</pre>
                  </div>
                </div>
              )}
              {mapping.request.cookies && Object.keys(mapping.request.cookies).length > 0 && (
                <div>
                  <label className="form-label">Cookies</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(mapping.request.cookies, null, 2)}</pre>
                  </div>
                </div>
              )}
              {mapping.request.bodyPatterns && mapping.request.bodyPatterns.length > 0 && (
                <div>
                  <label className="form-label">Body Patterns</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(mapping.request.bodyPatterns, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2>Response</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Status</label>
                <span className={`badge ${getStatusBadgeClass(mapping.response.status)}`}>
                  {mapping.response.status}
                </span>
              </div>
              {mapping.response.headers && Object.keys(mapping.response.headers).length > 0 && (
                <div>
                  <label className="form-label">Headers</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(mapping.response.headers, null, 2)}</pre>
                  </div>
                </div>
              )}
              {(mapping.response.body && mapping.response.body.trim() !== '') || mapping.response.jsonBody ? (
                <div className="md:col-span-2">
                  <label className="form-label">Body</label>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => {
                        const bodyContent = mapping.response.jsonBody 
                          ? JSON.stringify(mapping.response.jsonBody, null, 2)
                          : mapping.response.body || '';
                        copyToClipboard(bodyContent);
                      }}
                      className="btn btn-sm btn-secondary"
                      title="Copiar Body"
                    >
                      <Copy size={12} />
                      Copiar
                    </button>
                  </div>
                  <div className="response-body">
                    <pre>
                      {mapping.response.jsonBody 
                        ? JSON.stringify(mapping.response.jsonBody, null, 2)
                        : mapping.response.body
                      }
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2">
                  <label className="form-label">Body</label>
                  <p className="text-secondary-color">No hay body configurado para este response</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMethodBadgeClass(method: string): string {
  const methodClasses: Record<string, string> = {
    GET: 'badge-success',
    POST: 'badge-primary',
    PUT: 'badge-warning',
    DELETE: 'badge-danger',
    PATCH: 'badge-info',
    HEAD: 'badge-secondary',
    OPTIONS: 'badge-secondary',
    ANY: 'badge-info',
  };
  return methodClasses[method] || 'badge-secondary';
}

function getStatusBadgeClass(status: number): string {
  if (status >= 200 && status < 300) return 'badge-success';
  if (status >= 300 && status < 400) return 'badge-warning';
  if (status >= 400 && status < 500) return 'badge-danger';
  if (status >= 500) return 'badge-danger';
  return 'badge-secondary';
} 