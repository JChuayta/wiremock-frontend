# WireMock Frontend Manager

Un frontend moderno y elegante para gestionar endpoints falsos de WireMock. Desarrollado con React, TypeScript y CSS puro, siguiendo la arquitectura Screaming.

## 🚀 Características

- **Gestión de Mappings**: Crear, editar, eliminar y visualizar mappings de WireMock
- **Logs de Requests**: Ver todos los requests que llegan a WireMock
- **Interfaz Moderna**: Diseño limpio y responsive con CSS puro
- **Arquitectura Screaming**: Estructura simple y directa
- **TypeScript**: Tipado completo para mejor desarrollo
- **Tiempo Real**: Verificación de conexión con WireMock

## 🛠️ Tecnologías

- **React 19** - Framework de UI
- **TypeScript** - Tipado estático
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **CSS Puro** - Estilos sin frameworks

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd wiremock-frontend
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
│   ├── Header.tsx
│   ├── MappingsList.tsx
│   └── MappingForm.tsx
├── pages/              # Páginas de la aplicación
│   ├── HomePage.tsx
│   ├── CreateMappingPage.tsx
│   ├── EditMappingPage.tsx
│   └── RequestsPage.tsx
├── services/           # Servicios de API
│   └── wiremock-api.ts
├── store/              # Estado de la aplicación
│   └── app-store.ts
├── types/              # Definiciones de tipos
│   ├── wiremock.ts
│   └── css.d.ts
├── styles/             # Estilos CSS
│   └── global.css
└── utils/              # Utilidades
```

### Principios de la Arquitectura Screaming

- **Simplicidad**: Estructura directa y fácil de entender
- **Separación de Responsabilidades**: Cada carpeta tiene un propósito claro
- **Escalabilidad**: Fácil de extender sin complejidad innecesaria
- **Mantenibilidad**: Código organizado y bien documentado

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

### 3. Estado de Conexión

- **Verificación Automática**: Chequeo cada 5 segundos
- **Indicador Visual**: Iconos y colores para el estado
- **Reconexión Manual**: Botón para verificar conexión

## 🎨 Diseño

### Paleta de Colores
- **Primario**: `#3b82f6` (Azul)
- **Éxito**: `#10b981` (Verde)
- **Advertencia**: `#f59e0b` (Amarillo)
- **Error**: `#ef4444` (Rojo)
- **Secundario**: `#64748b` (Gris)

### Componentes CSS
- **Botones**: `.btn`, `.btn-primary`, `.btn-secondary`, etc.
- **Formularios**: `.form-input`, `.form-select`, `.form-textarea`
- **Cards**: `.card`, `.card-header`, `.card-body`
- **Tablas**: `.table`, `.table th`, `.table td`
- **Badges**: `.badge`, `.badge-success`, `.badge-error`
- **Alertas**: `.alert`, `.alert-success`, `.alert-error`

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_WIREMOCK_URL=http://localhost:8080
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

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de producción
npm run lint         # Linting
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación de WireMock
2. Verifica que WireMock esté ejecutándose en el puerto correcto
3. Revisa la consola del navegador para errores
4. Abre un issue en el repositorio

---

**Desarrollado con ❤️ para hacer el desarrollo con WireMock más fácil y visual**
