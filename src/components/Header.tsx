import { Plus, Settings, Wifi, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generalApi } from '../services/wiremock-api';

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const connected = await generalApi.health();
      setIsConnected(connected);
    } catch {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  const navItems = [
    { path: '/', label: 'Mappings', icon: Settings },
    { path: '/requests', label: 'Requests', icon: Wifi },
    { path: '/create', label: 'Crear Mapping', icon: Plus },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-primary-color">
              WireMock Manager
            </h1>
            
            <nav className="flex gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {isChecking ? (
                <div className="spinner" />
              ) : isConnected ? (
                <>
                  <Wifi size={16} className="text-success-color" />
                  <span className="text-sm text-success-color">Conectado</span>
                </>
              ) : (
                <>
                  <WifiOff size={16} className="text-error-color" />
                  <span className="text-sm text-error-color">Desconectado</span>
                </>
              )}
            </div>
            
            <button
              onClick={checkConnection}
              className="btn btn-sm btn-secondary"
              disabled={isChecking}
            >
              {isChecking ? 'Verificando...' : 'Reconectar'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 