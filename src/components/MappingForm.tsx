import { ArrowLeft, Save, TestTube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mappingsApi } from '../services/wiremock-api';
import { useAppStore } from '../store/app-store';
import type { WireMockMapping } from '../types/wiremock';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export default function MappingForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state, actions } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<WireMockMapping>({
    request: {
      method: 'GET',
      urlPath: '',
    },
    response: {
      status: 200,
      body: '',
    },
    name: '',
    priority: 1,
    persistent: true,
  });

  useEffect(() => {
    if (id) {
      loadMapping();
    }
  }, [id]);

  const loadMapping = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const mapping = await mappingsApi.getById(id);
      setFormData(mapping);
    } catch (error) {
      actions.setError('Error al cargar el mapping');
      console.error('Error loading mapping:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequestChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      request: {
        ...prev.request,
        [field]: value,
      },
    }));
  };

  const handleResponseChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      response: {
        ...prev.response,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      actions.setError(null);

      if (id) {
        await mappingsApi.update(id, formData);
        actions.updateMapping(formData);
      } else {
        const newMapping = await mappingsApi.create(formData);
        actions.addMapping(newMapping);
      }

      navigate('/');
    } catch (error) {
      actions.setError('Error al guardar el mapping');
      console.error('Error saving mapping:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const testMapping = () => {
    const url = `http://localhost:8080${formData.request.urlPath}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Cargando mapping...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={16} />
          Volver
        </button>
        <h2 className="text-2xl font-bold">
          {id ? 'Editar Mapping' : 'Crear Nuevo Mapping'}
        </h2>
      </div>

      {state.error && (
        <div className="alert alert-error mb-4">
          {state.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Información General</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Nombre (opcional)</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="form-input"
                  placeholder="Nombre descriptivo del mapping"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Prioridad</label>
                <select
                  value={formData.priority || 1}
                  onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                  className="form-select"
                >
                  <option value={1}>Baja</option>
                  <option value={5}>Normal</option>
                  <option value={10}>Alta</option>
                </select>
              </div>

              <div className="form-group">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.persistent || false}
                    onChange={(e) => handleInputChange('persistent', e.target.checked)}
                    className="form-input"
                    style={{ width: 'auto' }}
                  />
                  Persistente
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Request</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label">Método HTTP</label>
                <select
                  value={formData.request.method}
                  onChange={(e) => handleRequestChange('method', e.target.value)}
                  className="form-select"
                >
                  {HTTP_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </div>

              <div className="form-group md:col-span-2">
                <label className="form-label">URL Path</label>
                <input
                  type="text"
                  value={formData.request.urlPath || ''}
                  onChange={(e) => handleRequestChange('urlPath', e.target.value)}
                  className="form-input"
                  placeholder="/api/users"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Headers (JSON opcional)</label>
              <textarea
                value={JSON.stringify(formData.request.headers || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value);
                    handleRequestChange('headers', headers);
                  } catch {
                    // Ignore invalid JSON
                  }
                }}
                className="form-textarea"
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Query Parameters (JSON opcional)</label>
              <textarea
                value={JSON.stringify(formData.request.queryParameters || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const params = JSON.parse(e.target.value);
                    handleRequestChange('queryParameters', params);
                  } catch {
                    // Ignore invalid JSON
                  }
                }}
                className="form-textarea"
                placeholder='{"page": "1", "limit": "10"}'
                rows={3}
              />
            </div>

            {['POST', 'PUT', 'PATCH'].includes(formData.request.method) && (
              <div className="form-group">
                <label className="form-label">Body Pattern (JSON opcional)</label>
                <textarea
                  value={JSON.stringify(formData.request.bodyPatterns || [], null, 2)}
                  onChange={(e) => {
                    try {
                      const patterns = JSON.parse(e.target.value);
                      handleRequestChange('bodyPatterns', patterns);
                    } catch {
                      // Ignore invalid JSON
                    }
                  }}
                  className="form-textarea"
                  placeholder='[{"equalTo": "{\\"name\\": \\"test\\"}"}]'
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Response</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Status Code</label>
                <input
                  type="number"
                  value={formData.response.status}
                  onChange={(e) => handleResponseChange('status', parseInt(e.target.value))}
                  className="form-input"
                  min="100"
                  max="599"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delay (ms)</label>
                <input
                  type="number"
                  value={formData.response.fixedDelayMilliseconds || 0}
                  onChange={(e) => handleResponseChange('fixedDelayMilliseconds', parseInt(e.target.value))}
                  className="form-input"
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Response Headers (JSON opcional)</label>
              <textarea
                value={JSON.stringify(formData.response.headers || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value);
                    handleResponseChange('headers', headers);
                  } catch {
                    // Ignore invalid JSON
                  }
                }}
                className="form-textarea"
                placeholder='{"Content-Type": "application/json"}'
                rows={3}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Response Body</label>
              <textarea
                value={formData.response.body || ''}
                onChange={(e) => handleResponseChange('body', e.target.value)}
                className="form-textarea"
                placeholder='{"message": "Hello World"}'
                rows={6}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="btn btn-primary btn-lg"
          >
            {isSaving ? (
              <>
                <div className="spinner" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={16} />
                {id ? 'Actualizar' : 'Crear'} Mapping
              </>
            )}
          </button>

          <button
            type="button"
            onClick={testMapping}
            className="btn btn-secondary btn-lg"
          >
            <TestTube size={16} />
            Probar
          </button>
        </div>
      </form>
    </div>
  );
} 