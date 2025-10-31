# Usamos una imagen ligera de Node.js
FROM node:20-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código del proyecto
COPY . .

# Exponemos el puerto de Vite
EXPOSE 5173

# El comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
