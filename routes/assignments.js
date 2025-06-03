const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Додати 5 документів
router.post('/seed', async (req, res) => {
  const data = [
    { name: "Іван", subject: "Математика", score: 90 },
    { name: "Олена", subject: "Фізика", score: 75 },
    { name: "Андрій", subject: "Інформатика", score: 82 },
    { name: "Марія", subject: "Хімія", score: 65 },
    { name: "Тарас", subject: "Біологія", score: 88 }
  ];
  await Assignment.insertMany(data);
  res.send('Дані додано');
});

// Знайти всі, де score > 80
router.get('/high-scores', async (req, res) => {
  const results = await Assignment.find({ score: { $gt: 80 } });
  res.json(results);
});

// Збільшити score на 5 для одного студента < 85
router.put('/increase-score', async (req, res) => {
  const result = await Assignment.updateOne(
    { score: { $lt: 85 } },
    { $inc: { score: 5 } }
  );
  res.json(result);
});

// Видалити студента з найнижчим балом
router.delete('/delete-lowest', async (req, res) => {
  const lowest = await Assignment.findOne().sort({ score: 1 });
  if (lowest) {
    await Assignment.deleteOne({ _id: lowest._id });
    res.send(`Видалено: ${lowest.name}`);
  } else {
    res.send('Немає даних');
  }
});

// Вивести тільки ім’я та бал
router.get('/names-scores', async (req, res) => {
  const results = await Assignment.find({}, { name: 1, score: 1, _id: 0 });
  res.json(results);
});

module.exports = router;

