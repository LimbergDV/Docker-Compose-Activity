# Microservicios CarGo

Este proyecto contiene una aplicación basada en microservicios para un servicio de alquiler de coches llamado CarGo. La aplicación consta de un frontend, un backend y una base de datos.

---

## Servicios Incluidos

La aplicación se compone de los siguientes servicios:

* **`frontend_limberg`**: Una aplicación web desarrollada en Angular que proporciona la interfaz de usuario para el servicio CarGo.
* **`backend_delvalle`**: Una aplicación Node.js que implementa la lógica de negocio y expone una API REST para el frontend.
* **`db_limberg`**: Una base de datos MySQL que almacena los datos de la aplicación.

---

## Cómo Levantar el Entorno

Para levantar el entorno, necesitas tener **Docker** y **Docker Compose** instalados en tu máquina. Una vez que los tengas instalados, puedes seguir estos pasos:

1.  Clona el repositorio en tu máquina local.
2.  Abre una terminal y navega a la raíz del proyecto.
3.  Ejecuta el siguiente comando:

    ```bash
    docker-compose up -d
    ```

Este comando construirá las imágenes para los servicios de frontend y backend, e iniciará todos los servicios en modo separado (detached mode).

---

## Comunicación Entre Servicios

Los servicios se comunican entre sí de la siguiente manera:

* El servicio **`frontend_limberg`** se comunica con el servicio **`backend_delvalle`** a través de una API REST. La URL de la API se configura en la variable de entorno `API_URL` del servicio `frontend_limberg`.
* El servicio **`backend_delvalle`** se comunica con el servicio **`db_limberg`** para almacenar y recuperar datos. Los detalles de conexión para la base de datos se configuran en las variables de entorno del servicio `backend_delvalle`.

Todos los servicios están conectados a una red puente (bridge) personalizada llamada **`limberg_network`**, lo que les permite comunicarse entre sí utilizando sus nombres de servicio como nombres de host.

---

## Dockerfiles

### `docker-compose.yml` Dockerfile

version: "3.8"

services:
  frontend_limberg:
    build:
      context: ./CarGo_FrontEnd
      dockerfile: Dockerfile
    container_name: frontend_limberg
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend_delvalle:5000
    depends_on:
      - backend_delvalle
    networks:
      - limberg_network

  backend_delvalle:
    build:
      context: ./CarGo_BackEnd
      dockerfile: Dockerfile
    container_name: backend_delvalle
    ports:
      - "5001:3000"
    environment:
      - DB_HOST=db_limberg       
      - DB_NAME=db_cargo
      - DB_USER=root
      - DB_PASSWORD=limberg1423
    depends_on:
      - db_limberg
    networks:
      - limberg_network

  db_limberg:
    image: mysql:8.0
    container_name: db_limberg
    ports:
      - "3307:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=limberg1423
      - MYSQL_DATABASE=db_cargo
    volumes:
      - limberg_mysql_data:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    networks:
      - limberg_network

volumes:
  limberg_mysql_data:
    name: limberg_mysql_data

networks:
  limberg_network:
    driver: bridge
