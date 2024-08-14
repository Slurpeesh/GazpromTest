# Используем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Сборка проекта
RUN npm run build:prod

# Указываем команду по умолчанию для выполнения при запуске контейнера
CMD ["npm", "run", "start"]
