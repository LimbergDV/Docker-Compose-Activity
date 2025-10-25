FROM node:20 AS builder
LABEL authors="limbergDV"

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build -- --configuration production

# Segunda etapa: Servir la aplicación construida con un servidor web ligero
FROM node:20-slim

WORKDIR /app

# Instalar 'serve' globalmente para servir la aplicación Angular
RUN npm install -g serve


# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist/rent-car/browser/ .

# Crear un usuario no root para ejecutar la aplicación
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup --no-create-home appuser
RUN chown -R appuser:appgroup /app
USER appuser

# Exponer el puerto 3000
EXPOSE 3000

# Comando para servir la aplicación
ENTRYPOINT ["serve", "-s", "."]
