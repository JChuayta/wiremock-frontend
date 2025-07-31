import { Copy, Eye, RefreshCw, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { requestsApi } from '../services/wiremock-api';
import { useAppStore } from '../store/app-store';
import './RequestsPage.css';

export default function RequestsPage() {
  const { state, actions } = useAppStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      actions.setLoading(true);
      actions.setError(null);
      const requests = await requestsApi.getAll();
      actions.setRequests(requests);
    } catch (error) {
      actions.setError('Error al cargar los requests');
      console.error('Error loading requests:', error);
    } finally {
      actions.setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRequests();
    setIsRefreshing(false);
  };

  const handleClearAll = async () => {
    if (!confirm('¿Estás seguro de que quieres limpiar todos los logs?')) {
      return;
    }

    try {
      await requestsApi.reset();
      actions.setRequests([]);
    } catch (error) {
      actions.setError('Error al limpiar los logs');
      console.error('Error clearing requests:', error);
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

  if (state.loading) {
    return (
      <div className="requests-page">
        <div className="loading">
          <div className="spinner" />
          Cargando requests...
        </div>
      </div>
    );
  }

  return (
    <div className="requests-page">
      <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Requests Log</h2>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Actualizando...' : 'Actualizar'}
          </button>
          <button
            onClick={handleClearAll}
            className="btn btn-danger btn-sm"
          >
            <Trash2 size={16} />
            Limpiar Todo
          </button>
        </div>
      </div>

      {state.error && (
        <div className="alert alert-error">
          {state.error}
        </div>
      )}

      {state.requests.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <p className="text-secondary-color">No hay requests registrados</p>
            <p className="text-sm text-muted-color mt-2">
              Los requests aparecerán aquí cuando se hagan llamadas a tus mappings
            </p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <span className="text-sm text-secondary-color">
              {state.requests.length} requests registrados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>URL</th>
                  <th>IP Cliente</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.requests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <span className={`badge ${getMethodBadgeClass(request.request.method)}`}>
                        {request.request.method}
                      </span>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <span className="text-sm">
                        {request.request.clientIp}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(request.responseDefinition.status)}`}>
                        {request.responseDefinition.status}
                      </span>
                    </td>
                    <td>
                      <span className="text-sm">
                        {formatDate(request.request.loggedDate)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            // Aquí podrías abrir un modal con los detalles del request
                            console.log('Request details:', request);
                          }}
                          className="btn btn-sm btn-secondary"
                          title="Ver detalles"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
} 