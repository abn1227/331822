# Handy Service Marketplace

Un marketplace de servicios que conecta usuarios con proveedores de servicios.

## 🚀 Tecnologías

### Backend
- Node.js + Express
- TypeScript
- MongoDB (con Mongoose)
- JWT para autenticación
- CQRS Architecture
- Docker para desarrollo

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Zustand
- Vite

## 📋 Prerequisitos

- Node.js (v18 o superior)
- Docker y Docker Compose
- npm o yarn
- Git

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd handy-project
```

2. Instalar dependencias del backend:
```bash
cd backend
npm install
```

3. Instalar dependencias del frontend:
```bash
cd frontend
npm install
```

4. Configurar variables de entorno:

Backend (.env):
```env
# Server Configuration
PORT=3000
MONGODB_URL="mongodb://root:rootpassword@localhost:27017/handy_service?authSource=admin"
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
```

<!-- Frontend (.env):
```env
VITE_API_URL=http://localhost:3000/api
``` -->

## 🚀 Iniciar el Proyecto

### Desarrollo

1. Iniciar el backend con MongoDB:
```bash
cd backend
npm run dev
```
Este comando:
- Inicia MongoDB usando Docker Compose
- Inicia el servidor de desarrollo con hot-reload

<!-- 2. Iniciar el frontend:
```bash
cd frontend
npm run dev
``` -->

<!-- ### Producción

1. Build del backend:
```bash
cd backend
npm run build
npm start
```

2. Build del frontend:
```bash
cd frontend
npm run build
``` -->

## 📁 Estructura del Proyecto

### Backend
```
backend/
├── src/
│   ├── controllers/    # Controladores de la aplicación
│   ├── services/       # Servicios de negocio
│   ├── types/          # Tipos de datos
│   ├── models/         # Modelos de MongoDB
│   ├── repositories/   # Repositorios para acceso a datos
│   ├── commands/       # Comandos CQRS
│   ├── queries/        # Consultas CQRS
│   ├── dtos/          # Objetos de transferencia de datos
│   ├── middlewares/    # Middlewares de Express
│   ├── routes/         # Definición de rutas
│   ├── utils/          # Utilidades
│   ├── config/        # Configuraciones
│   └── app.ts         # Punto de entrada
├── tests/
├── .env
├── mongo-compose.yml
└── package.json
```

<!-- ### Frontend
```
frontend/
├── src/
│   ├── components/    # Componentes React
│   ├── hooks/        # Custom hooks
│   ├── services/     # Servicios de API
│   ├── contexts/     # Contextos de React
│   ├── pages/        # Páginas/Rutas
│   ├── utils/        # Utilidades
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env
└── package.json
``` -->

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para la autenticación:

1. Login:
```typescript
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

2. Respuesta:
```json
{
  "user": {
    "id": "123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

3. Uso del token:
```typescript
headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIs..."
}
```

## 🐳 Docker

El proyecto usa Docker para MongoDB en desarrollo:

1. Iniciar MongoDB:
```bash
npm run docker:up
```

2. Detener MongoDB:
```bash
npm run docker:down
```

3. Ver logs:
```bash
npm run docker:logs
```

Acceso a MongoDB:
- MongoDB: localhost:27017
- Mongo Express (UI): http://localhost:8081
  - Usuario: admin
  - Contraseña: pass

## 👥 Roles y Permisos

El sistema tiene dos roles principales:

1. **Admin**
- Gestionar proveedores de servicios
- Ver y gestionar todos los trabajos
- Gestionar usuarios

2. **Usuario**
- Solicitar servicios
- Ver sus propios trabajos
- Actualizar su perfil

## 🧪 Scripts Disponibles

### Backend
```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Compila el proyecto
npm run start        # Inicia el servidor en producción
npm run lint         # Ejecuta el linter
npm run format       # Formatea el código
npm run test         # Ejecuta los tests
npm run docker:up    # Inicia los servicios de Docker
npm run docker:down  # Detiene los servicios de Docker
```

<!-- ### Frontend
```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Compila el proyecto
npm run preview      # Vista previa de la build
npm run lint         # Ejecuta el linter
npm run format       # Formatea el código
``` -->

## 📝 Convenciones de Código

El proyecto utiliza:
- ESLint para linting

Configuración disponible en:
- `.eslintrc.json`

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)