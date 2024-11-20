#!/bin/bash

# Colores para los logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir logs con formato
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

# Función para verificar si un puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        error "Puerto $1 ya está en uso. Terminando proceso..."
        kill_processes
        exit 1
    fi
}

# Función para matar todos los procesos
kill_processes() {
    info "Deteniendo todos los servicios..."
    kill $(jobs -p) 2>/dev/null
}

# Manejar la señal de interrupción (Ctrl+C)
trap kill_processes EXIT INT TERM

# Verificar puertos antes de iniciar
check_port 3000  # Puerto del backend
check_port 5173  # Puerto de Vite
check_port 6006  # Puerto de Storybook

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    error "No se encontraron los directorios backend y/frontend. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Verificar que las dependencias estén instaladas
log "Verificando dependencias..."

if [ ! -d "backend/node_modules" ]; then
    warning "Instalando dependencias del backend..."
    cd backend && npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    warning "Instalando dependencias del frontend..."
    cd frontend && npm install
    cd ..
fi

# Iniciar servicios
log "Iniciando servicios..."

# Iniciar Backend
info "Iniciando Backend..."
cd backend
npm run dev &
cd ..

# Esperar a que el backend esté listo
sleep 5

# Iniciar Frontend
info "Iniciando Frontend..."
cd frontend
npm run dev &

# Iniciar Storybook
info "Iniciando Storybook..."
npm run storybook &
cd ..

# Mostrar todos los logs en una ventana
log "Todos los servicios han sido iniciados."
info "
Servicios disponibles en:
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api-docs
- Frontend: http://localhost:5173
- Storybook: http://localhost:6006
"
info "Presiona Ctrl+C para detener todos los servicios."

# Mantener el script corriendo y mostrar los logs
wait