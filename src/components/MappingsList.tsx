import { Copy, Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mappingsApi } from '../services/wiremock-api';
import { useAppStore } from '../store/app-store';
import './MappingsList.css';

export default function MappingsList() {
  const { state, actions } = useAppStore();
  const [selectedMappings, setSelectedMappings] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadMappings();
  }, []);

  const loadMappings = async () => {
    try {
      actions.setLoading(true);
      actions.setError(null);
      const mappings = await mappingsApi.getAll();
      actions.setMappings(mappings);
    } catch (error) {
      actions.setError('Error al cargar los mappings');
      console.error('Error loading mappings:', error);
    } finally {
      actions.setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este mapping?')) {
      return;
    }

    try {
      await mappingsApi.delete(id);
      actions.deleteMapping(id);
    } catch (error) {
      actions.setError('Error al eliminar el mapping');
      console.error('Error deleting mapping:', error);
    }
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`¿Estás seguro de que quieres eliminar ${selectedMappings.size} mappings?`)) {
      return;
    }

    try {
      for (const id of selectedMappings) {
        await mappingsApi.delete(id);
        actions.deleteMapping(id);
      }
      setSelectedMappings(new Set());
    } catch (error) {
      actions.setError('Error al eliminar los mappings seleccionados');
      console.error('Error deleting selected mappings:', error);
    }
  };

  const handleSelectAll = () => {
    if (selectedMappings.size === state.mappings.length) {
      setSelectedMappings(new Set());
    } else {
      setSelectedMappings(new Set(state.mappings.map(m => m.id || '')));
    }
  };

  const handleSelectMapping = (id: string) => {
    const newSelected = new Set(selectedMappings);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMappings(newSelected);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
      <div className="mappings-list">
        <div className="loading">
          <div className="spinner" />
          Cargando mappings...
        </div>
      </div>
    );
  }

  return (
    <div className="mappings-list w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mappings</h2>
        <div className="flex gap-2">
          {selectedMappings.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="btn btn-danger btn-sm"
            >
              <Trash2 size={16} />
              Eliminar ({selectedMappings.size})
            </button>
          )}
          <Link to="/create" className="btn btn-primary btn-sm">
            <Plus size={16} />
            Nuevo Mapping
          </Link>
        </div>
      </div>

      {state.error && (
        <div className="alert alert-error">
          {state.error}
        </div>
      )}

      {state.mappings.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <p className="text-secondary-color mb-4">No hay mappings configurados</p>
            <Link to="/create" className="btn btn-primary">
              <Plus size={16} />
              Crear tu primer mapping
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedMappings.size === state.mappings.length}
                  onChange={handleSelectAll}
                  className="form-input"
                  style={{ width: 'auto' }}
                />
                Seleccionar todos
              </label>
              <span className="text-sm text-secondary-color">
                {state.mappings.length} mappings
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}></th>
                  <th>Método</th>
                  <th>URL</th>
                  <th>Estado</th>
                  <th>Prioridad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.mappings.map((mapping) => (
                  <tr key={mapping.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMappings.has(mapping.id || '')}
                        onChange={() => handleSelectMapping(mapping.id || '')}
                        className="form-input"
                        style={{ width: 'auto' }}
                      />
                    </td>
                    <td>
                      <span className={`badge ${getMethodBadgeClass(mapping.request.method)}`}>
                        {mapping.request.method}
                      </span>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(mapping.response.status)}`}>
                        {mapping.response.status}
                      </span>
                    </td>
                    <td>
                      {mapping.priority || 'Normal'}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <Link
                          to={`/mapping/${mapping.id}`}
                          className="btn btn-sm btn-secondary"
                          title="Ver detalles"
                        >
                          <Eye size={14} />
                        </Link>
                        <Link
                          to={`/edit/${mapping.id}`}
                          className="btn btn-sm btn-secondary"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(mapping.id || '')}
                          className="btn btn-sm btn-danger"
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
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
  );
} 