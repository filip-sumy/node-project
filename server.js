const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Данные пользователей и статей
const users = [
  { id: 1, name: 'Иван' },
  { id: 2, name: 'Мария' },
  { id: 3, name: 'Петр' }
];

const articles = [
  { id: 1, title: 'Статья 1', content: 'Содержание статьи 1' },
  { id: 2, title: 'Статья 2', content: 'Содержание статьи 2' },
  { id: 3, title: 'Статья 3', content: 'Содержание статьи 3' }
];

// Главная страница
app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

// Страница списка пользователей
app.get('/users', (req, res) => {
  res.render(path.join(__dirname, 'views/pug/users.pug'), { users });
});

// Страница пользователя по ID
app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));
  if (user) {
    res.render(path.join(__dirname, 'views/pug/user.pug'), { user });
  } else {
    res.status(404).send('Пользователь не найден');
  }
});

// Страница списка статей
app.get('/articles', (req, res) => {
  res.render(path.join(__dirname, 'views/ejs/articles.ejs'), { articles });
});

// Страница статьи по ID
app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));
  if (article) {
    res.render(path.join(__dirname, 'views/ejs/article.ejs'), { article });
  } else {
    res.status(404).send('Статья не найдена');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
