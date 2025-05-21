const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// --- INSERT ONE ---
router.post('/pizzas', async (req, res) => {
    try {
        const pizza = new Pizza(req.body);
        await pizza.save();
        res.status(201).json(pizza);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- INSERT MANY ---
router.post('/pizzas/many', async (req, res) => {
    try {
        const pizzas = await Pizza.insertMany(req.body);
        res.status(201).json(pizzas);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- FIND (WITH PROJECTION) ---
router.get('/pizzas', async (req, res) => {
    try {
        const pizzas = await Pizza.find({}, { name: 1, price: 1 }); // приклад проекції
        res.render('pizzas', { pizzas });
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Новый маршрут: /pizzas/ids — возвращает JSON с id всех пицц
router.get('/pizzas/ids', async (req, res) => {
    try {
        const pizzas = await Pizza.find({}, { name: 1 }); // выбираем только _id и name
        res.json(pizzas);
    } catch (err) {
        res.status(500).json({ error: 'Помилка при отриманні ID піцц' });
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
// --- UPDATE ONE ---
router.put('/pizzas/:id', async (req, res) => {
    try {
        const result = await Pizza.updateOne({ _id: req.params.id }, { $set: req.body });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- UPDATE MANY ---
router.put('/pizzas', async (req, res) => {
    try {
        const result = await Pizza.updateMany(req.body.filter, { $set: req.body.update });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- REPLACE ONE ---
router.put('/pizzas/replace/:id', async (req, res) => {
    try {
        const result = await Pizza.replaceOne({ _id: req.params.id }, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- DELETE ONE ---
router.delete('/pizzas/:id', async (req, res) => {
    try {
        const result = await Pizza.deleteOne({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// --- DELETE MANY ---
router.delete('/pizzas', async (req, res) => {
    try {
        const result = await Pizza.deleteMany(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
