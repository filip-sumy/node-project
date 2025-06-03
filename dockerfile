# Базовий образ з Node.js LTS
FROM node:lts
# Встановлюємо робочу директорію
WORKDIR /app
# Копіюємо package.json та package-lock.json (якщо є)
COPY package*.json ./
# Встановлюємо залежності
RUN npm install
# Копіюємо всі файли проекту
COPY . .
# Відкриваємо порт 3000
EXPOSE 3000
# Запускаємо додаток
CMD ["node", "app.js"]

