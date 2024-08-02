# cinema

## Correr en desarrollo

### Backend
1. Acceder al directorio ```api-cinema```
2. Crear archivo ```.env``` (en la raíz del proyecto) con el siguiente contenido:
    ```
    MYSQL_HOST=localhost
    MYSQL_LOCAL_PORT=3307
    MYSQL_DOCKER_PORT=3306
    MYSQL_PORT=3307
    MYSQL_USER=user_cinema
    MYSQL_ROOT_PASSWORD=root
    MYSQL_PASSWORD=root
    MYSQL_DATABASE=cinema

    EMAIL_HOST=live.smtp.mailtrap.io
    EMAIL_USERNAME=api
    EMAIL_PASSWORD=c1658d7a9e8c45c11e614257d6095603
    ```
3. Instalar dependencias: ```npm install```
4. Levantar la base de datos: ```docker compose up -d```
5. Correr el proyecto: ```npm run start:dev```

### Frontend
1. Acceder al directorio ```Cinema```
2. Instalar dependencias: ```npm install```
3. Correr el proyecto: ```npm run dev```

## Correr en producción

1. Acceder al directorio ```Cinema```
2. Crear imagen del proyecto frontend: ```docker build -t cinema-front .```
3. Acceder al directorio ```api-cinema```
4. Crear archivo ```.env``` (en la raíz del proyecto) con el siguiente contenido:
    ```
    MYSQL_HOST=mysql-db
    MYSQL_LOCAL_PORT=3307
    MYSQL_DOCKER_PORT=3306
    MYSQL_PORT=3306
    MYSQL_USER=user_cinema
    MYSQL_ROOT_PASSWORD=root
    MYSQL_PASSWORD=root
    MYSQL_DATABASE=cinema

    EMAIL_HOST=live.smtp.mailtrap.io
    EMAIL_USERNAME=api
    EMAIL_PASSWORD=c1658d7a9e8c45c11e614257d6095603

    NESTJS_APP_LOCAL_PORT=3000
    NESTJS_APP_DOCKER_PORT=3000
    
    NEXTJS_APP_LOCAL_PORT=3001
    NEXTJS_APP_DOCKER_PORT=3001
    ```
5. Crear imagen del proyecto backend: ```docker build -t cinema-back .```
6. Reemplazar el contenido del archivo ```docker-compose.yml``` por:
    ```
    version: "3.8"
    
    networks:
      app-network:
        driver: bridge
    
    services:
      #BD
      mysql-db:
        container_name: mysql-db
        image: mysql:8.0
        restart: always
        env_file: ./.env
        environment:
          MYSQL_ROOT_PASSWORD: $MYSQL_ROOT_PASSWORD
          MYSQL_DATABASE: $MYSQL_DATABASE
          MYSQL_USER: $MYSQL_USER
          MYSQL_PASSWORD: $MYSQL_PASSWORD
        ports:
          - $MYSQL_LOCAL_PORT:$MYSQL_DOCKER_PORT
        volumes:
          - ./mysql:/var/lib/mysql
        networks:
          - app-network
    
      #BACKEND
      nestjs-app:
        container_name: nestjs-app
        depends_on: 
          - mysql-db
        image: cinema-back
        restart: always
        env_file: ./.env
        ports:
         - $NESTJS_APP_LOCAL_PORT:$NESTJS_APP_DOCKER_PORT
        networks:
          - app-network
    
      #FRONTEND
      nextjs-app:
        container_name: nextjs-app
        depends_on:
          - nestjs-app
        image: cinema-front
        restart: always
        env_file: ./.env
        ports:
         - $NEXTJS_APP_LOCAL_PORT:$NEXTJS_APP_DOCKER_PORT
        networks:
          - app-network
    ```
7. Crear contenedores: ```docker compose up -d```
8. Acceder al sitio: http://localhost:3001/
