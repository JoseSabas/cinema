# cinema

## Correr en desarrollo

### Backend
1. Acceder al directorio ```api-cinema```
2. Instalar dependencias: ```npm install```
3. Levantar la base de datos: ```docker compose up -d```
4. Correr el proyecto: ```npm run start:dev```

### Frontend
1. Acceder al directorio ```Cinema```
2. Instalar dependencias: ```npm install```
3. Correr el proyecto: ```npm run dev```

## Correr en producción

1. Acceder al directorio ```Cinema```
2. Crear imagen del proyecto backend: ```docker build -t cinema-front .```
3. Acceder al directorio ```api-cinema```
4. Crear imagen del proyecto backend: ```docker build -t cinema-back .```
5. Crear contenedores: ```docker compose up -d```
6. Acceder al sitio: <ins>http://localhost:3001/</ins>
