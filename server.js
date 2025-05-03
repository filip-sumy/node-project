const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Маршрут для /users с использованием Pug
app.get('/users', (req, res) => {
  res.render(path.join(__dirname, 'views/pug/users.pug'));
});

// Маршрут для /articles с использованием EJS
app.get('/articles', (req, res) => {
  const articles = [
    { id: 1, title: 'Статья 1' },
    { id: 2, title: 'Статья 2' },
    { id: 3, title: 'Статья 3' }
  ];
  res.render(path.join(__dirname, 'views/ejs/articles.ejs'), { articles });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
