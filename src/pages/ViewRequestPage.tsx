import { ArrowLeft, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { requestsApi } from '../services/wiremock-api';
import { useAppStore } from '../store/app-store';
import type { WireMockRequestLog } from '../types/wiremock';
import './ViewRequestPage.css';

export default function ViewRequestPage() {
  const { id } = useParams<{ id: string }>();
  const { state, actions } = useAppStore();
  const [request, setRequest] = useState<WireMockRequestLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRequest();
    }
  }, [id]);

  const loadRequest = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const requestData = await requestsApi.getById(id);
      console.log('Request cargado:', requestData);
      setRequest(requestData);
    } catch (error) {
      actions.setError('Error al cargar el request');
      console.error('Error loading request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES');
  };

  const getMethodBadgeClass = (method: string) => {
    const methodColors: Record<string, string> = {
      GET: 'badge-success',
      POST: 'badge-info',
      PUT: 'badge-warning',
      DELETE: 'badge-error',
      PATCH: 'badge-info',
    };
    return methodColors[method.toUpperCase()] || 'badge-secondary';
  };

  const getStatusBadgeClass = (status: number) => {
    if (status >= 200 && status < 300) return 'badge-success';
    if (status >= 400 && status < 500) return 'badge-warning';
    if (status >= 500) return 'badge-error';
    return 'badge-info';
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

  if (!request) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-body text-center">
            <p>Request no encontrado</p>
            <Link to="/requests" className="btn btn-primary">
              Volver a Requests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link to="/requests" className="btn btn-secondary">
            <ArrowLeft size={16} />
            Volver a Requests
          </Link>
          <h1>Detalles del Request</h1>
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
                  <span className="font-mono text-sm">{request.id}</span>
                  <button
                    onClick={() => copyToClipboard(request.id)}
                    className="btn btn-sm btn-secondary"
                    title="Copiar ID"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div>
                <label className="form-label">Fecha</label>
                <p>{formatDate(request.request.loggedDate)}</p>
              </div>
              <div>
                <label className="form-label">IP Cliente</label>
                <p>{request.request.clientIp}</p>
              </div>
              <div>
                <label className="form-label">Status</label>
                <span className={`badge ${getStatusBadgeClass(request.responseDefinition.status)}`}>
                  {request.responseDefinition.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="card">
          <div className="card-header">
            <h2>Request</h2>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <label className="form-label">Método</label>
                <span className={`badge ${getMethodBadgeClass(request.request.method)}`}>
                  {request.request.method}
                </span>
              </div>
              <div>
                <label className="form-label">URL</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    {request.request.url}
                  </span>
                  <button
                    onClick={() => copyToClipboard(request.request.url)}
                    className="btn btn-sm btn-secondary"
                    title="Copiar URL"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              <div>
                <label className="form-label">URL Absoluta</label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">
                    {request.request.absoluteUrl}
                  </span>
                  <button
                    onClick={() => copyToClipboard(request.request.absoluteUrl)}
                    className="btn btn-sm btn-secondary"
                    title="Copiar URL Absoluta"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              {request.request.headers && Object.keys(request.request.headers).length > 0 && (
                <div>
                  <label className="form-label">Headers</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(request.request.headers, null, 2)}</pre>
                  </div>
                </div>
              )}
              {request.request.cookies && Object.keys(request.request.cookies).length > 0 && (
                <div>
                  <label className="form-label">Cookies</label>
                  <div className="response-headers">
                    <pre>{JSON.stringify(request.request.cookies, null, 2)}</pre>
                  </div>
                </div>
              )}
              {request.request.body && request.request.body.trim() !== '' && (
                <div>
                  <label className="form-label">Body</label>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => copyToClipboard(request.request.body)}
                      className="btn btn-sm btn-secondary"
                      title="Copiar Body"
                    >
                      <Copy size={12} />
                      Copiar
                    </button>
                  </div>
                  <div className="response-body">
                    <pre>{request.request.body}</pre>
                  </div>
                </div>
              )}
              {(!request.request.body || request.request.body.trim() === '') && (
                <div>
                  <label className="form-label">Body</label>
                  <p className="text-secondary-color">No hay body en este request</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Response Details */}
        <div className="card lg:col-span-2">
          <div className="card-header">
            <h2>Response</h2>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Status</label>
                <span className={`badge ${getStatusBadgeClass(request.responseDefinition.status)}`}>
                  {request.responseDefinition.status}
                </span>
              </div>
              <div>
                <label className="form-label">Desde Stub Configurado</label>
                <p>{request.responseDefinition.fromConfiguredStub ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 