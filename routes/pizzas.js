const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

//
// --- GET маршрути ---
//

// Статистика по піцам (агрегація)
router.get('/pizzas/stats', async (req, res) => {
  try {
    const stats = await Pizza.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          averagePrice: 1,
          minPrice: 1,
          maxPrice: 1,
          count: 1
        }
      }
    ]);
    res.json(stats[0]);
  } catch (err) {
    console.error('Помилка у /pizzas/stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// Курсорне отримання 20 піц
router.get('/pizzas/cursor', async (req, res) => {
  try {
    const cursor = Pizza.find({}, { name: 1, price: 1 }).cursor();

    const pizzas = [];
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      pizzas.push(doc);
      if (pizzas.length >= 20) break;
    }

    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Список ID усіх піц
router.get('/pizzas/ids', async (req, res) => {
  try {
    const pizzas = await Pizza.find({}, { name: 1 });
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні ID піцц' });
  }
});

// Отримати всі піци (з проекцією) і рендер
router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizza.find({}, { name: 1, price: 1 });
    res.render('pizzas', { pizzas });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Отримати піцу за ID
router.get('/pizzas/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).send('Піцу не знайдено');
    }
    res.json(pizza);
  } catch (err) {
    res.status(500).send('Помилка при отриманні піци');
  }
});

//
// --- POST маршрути ---
//

// Додати одну піцу
router.post('/pizzas', async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Додати багато піц
router.post('/pizzas/many', async (req, res) => {
  try {
    const pizzas = await Pizza.insertMany(req.body);
    res.status(201).json(pizzas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// --- PUT маршрути ---
//

// Оновити одну піцу
router.put('/pizzas/:id', async (req, res) => {
  try {
    const result = await Pizza.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Оновити багато піц
router.put('/pizzas', async (req, res) => {
  try {
    const result = await Pizza.updateMany(req.body.filter, { $set: req.body.update });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Повністю замінити одну піцу
router.put('/pizzas/replace/:id', async (req, res) => {
  try {
    const result = await Pizza.replaceOne({ _id: req.params.id }, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//
// --- DELETE маршрути ---
//

// Видалити одну піцу
router.delete('/pizzas/:id', async (req, res) => {
  try {
    const result = await Pizza.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Видалити багато піц
router.delete('/pizzas', async (req, res) => {
  try {
    const result = await Pizza.deleteMany(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
