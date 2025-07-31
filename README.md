# WireMock Manager

Una interfaz web moderna y elegante para gestionar endpoints falsos de WireMock. Desarrollado con React, TypeScript y CSS puro modular, siguiendo la arquitectura Screaming.

## 🚀 Características

- **Gestión de Mappings**: Crear, editar, eliminar y visualizar mappings de WireMock
- **Logs de Requests**: Ver todos los requests que llegan a WireMock
- **Interfaz Moderna**: Diseño limpio y responsive con CSS puro modular
- **Arquitectura Screaming**: Estructura simple y directa
- **TypeScript**: Tipado completo para mejor desarrollo
- **Tiempo Real**: Verificación de conexión con WireMock
- **CSS Modular**: Cada componente tiene su propio archivo CSS

## 🛠️ Tecnologías

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **CSS Puro Modular** - Estilos organizados por componente

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd wiremock-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar WireMock**
   Asegúrate de que WireMock esté ejecutándose en `http://localhost:8080`

4. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 🏗️ Arquitectura

### Estructura de Carpetas (Screaming Architecture)

```
src/
├── components/          # Componentes reutilizables
│   ├── Header.tsx + Header.css
│   ├── MappingsList.tsx + MappingsList.css
│   └── MappingForm.tsx + MappingForm.css
├── pages/              # Páginas de la aplicación
│   ├── HomePage.tsx + HomePage.css
│   ├── CreateMappingPage.tsx + CreateMappingPage.css
│   ├── EditMappingPage.tsx + EditMappingPage.css
│   └── RequestsPage.tsx + RequestsPage.css
├── services/           # Servicios de API
│   └── wiremock-api.ts
├── store/              # Estado de la aplicación
│   └── app-store.ts
├── types/              # Definiciones de tipos
│   └── wiremock.ts
└── styles/             # Estilos globales
    └── global.css
```

### Principios de la Arquitectura Screaming

- **Simplicidad**: Estructura directa y fácil de entender
- **Separación de Responsabilidades**: Cada carpeta tiene un propósito claro
- **Escalabilidad**: Fácil de extender sin complejidad innecesaria
- **Mantenibilidad**: Código organizado y bien documentado
- **CSS Modular**: Cada componente tiene sus propios estilos

## 🎨 Sistema de Estilos

### Arquitectura CSS Modular

El proyecto utiliza un sistema de estilos modular donde:

- **CSS Global** (`src/styles/global.css`): Variables CSS, estilos base y clases utilitarias
- **CSS por Componente**: Cada componente tiene su propio archivo CSS
- **Sin Frameworks**: Solo CSS puro, sin Tailwind ni otros frameworks

### Estructura de Estilos

```
src/
├── styles/
│   └── global.css          # Variables CSS, estilos base, utilidades
├── components/
│   ├── Header.css          # Estilos específicos del Header
│   ├── MappingForm.css     # Estilos específicos del formulario
│   └── MappingsList.css    # Estilos específicos de la lista
└── pages/
    ├── HomePage.css        # Estilos específicos de la página principal
    ├── CreateMappingPage.css
    ├── EditMappingPage.css
    └── RequestsPage.css    # Estilos específicos de la página de requests
```

### Variables CSS

```css
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --surface-color: #ffffff;
  --border-color: #e2e8f0;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --radius-md: 0.5rem;
}
```

### Componentes CSS

- **Botones**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-lg`
- **Formularios**: `.form-input`, `.form-select`, `.form-textarea`
- **Cards**: `.card`, `.card-header`, `.card-body`
- **Tablas**: `.table`, `.table th`, `.table td`
- **Badges**: `.badge`, `.badge-success`, `.badge-error`
- **Alertas**: `.alert`, `.alert-error`

## 🎯 Funcionalidades

### 1. Gestión de Mappings

- **Lista de Mappings**: Ver todos los mappings configurados
- **Crear Mapping**: Formulario completo para crear nuevos endpoints
- **Editar Mapping**: Modificar mappings existentes
- **Eliminar Mapping**: Eliminar mappings individuales o múltiples
- **Selección Múltiple**: Seleccionar y eliminar varios mappings

### 2. Logs de Requests

- **Ver Requests**: Lista de todos los requests recibidos
- **Filtrar por Método**: Visualizar requests por tipo HTTP
- **Copiar URLs**: Copiar URLs de requests al portapapeles
- **Limpiar Logs**: Eliminar todos los logs de requests
- **Actualizar en Tiempo Real**: Botón para refrescar la lista

### 3. Estado de Conexión

- **Verificación Automática**: Chequeo cada 5 segundos
- **Indicador Visual**: Iconos y colores para el estado
- **Reconexión Manual**: Botón para verificar conexión

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `env.example`:

> ⚠️ **Importante**: Nunca subas el archivo `.env` al repositorio. Contiene configuraciones sensibles.

```env
# Configuración de la API de WireMock
VITE_API_BASE_URL=https://tu-servidor-wiremock.com
VITE_PROXY_TARGET=https://tu-servidor-wiremock.com
VITE_USE_PROXY=false

# Para desarrollo local con WireMock en puerto 8080:
# VITE_API_BASE_URL=http://localhost:8080
# VITE_PROXY_TARGET=http://localhost:8080
# VITE_USE_PROXY=false

# Para usar con proxy de Vite (recomendado para desarrollo):
# VITE_API_BASE_URL=/api
# VITE_PROXY_TARGET=https://tu-servidor-wiremock.com
# VITE_USE_PROXY=true
```

### Configuración de WireMock

Asegúrate de que WireMock esté configurado con:

```bash
java -jar wiremock-standalone.jar --port 8080
```

## 📱 Responsive Design

La aplicación es completamente responsive y funciona en:
- **Desktop**: Pantallas grandes con navegación completa
- **Tablet**: Adaptación automática de layouts
- **Mobile**: Navegación optimizada para touch

### Breakpoints CSS

```css
/* Tablet */
@media (max-width: 768px) {
  /* Estilos adaptados */
}

/* Mobile */
@media (max-width: 640px) {
  /* Estilos móviles */
}
```

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de producción
npm run lint         # Linting
```

## 🎨 Paleta de Colores

- **Primario**: `#3b82f6` (Azul)
- **Éxito**: `#10b981` (Verde)
- **Advertencia**: `#f59e0b` (Amarillo)
- **Error**: `#ef4444` (Rojo)
- **Secundario**: `#64748b` (Gris)
- **Superficie**: `#ffffff` (Blanco)
- **Borde**: `#e2e8f0` (Gris claro)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- **CSS Modular**: Cada nuevo componente debe tener su propio archivo CSS
- **Variables CSS**: Usa las variables CSS definidas en `global.css`
- **Responsive**: Asegúrate de que los componentes sean responsive
- **TypeScript**: Mantén el tipado completo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔒 Seguridad

### Variables de Entorno

- **Nunca subas `.env` al repositorio**: Contiene URLs y configuraciones sensibles
- **Usa `env.example` como plantilla**: Copia y modifica según tu entorno
- **Configura URLs específicas localmente**: Cada desarrollador debe tener su propia configuración

### Configuración Segura

```bash
# Copia el archivo de ejemplo
cp env.example .env

# Edita con tus configuraciones específicas
nano .env
```

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de WireMock
2. Verifica que WireMock esté ejecutándose en el puerto correcto
3. Revisa la consola del navegador para errores
4. Verifica que las variables de entorno estén configuradas correctamente
5. Abre un issue en el repositorio

## 🔄 Changelog

### v1.1.0 - CSS Modular
- ✅ Refactorización completa del sistema de estilos
- ✅ CSS modular por componente
- ✅ Eliminación de dependencias de frameworks CSS
- ✅ Mejora en la organización del código
- ✅ Estilos específicos para cada página y componente

### v1.0.0 - Versión Inicial
- ✅ Gestión completa de mappings de WireMock
- ✅ Logs de requests en tiempo real
- ✅ Interfaz moderna y responsive
- ✅ Arquitectura Screaming

---

**Desarrollado con ❤️ para hacer el desarrollo con WireMock más fácil y visual**
