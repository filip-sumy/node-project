const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

router.get('/pizzas', async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.render('pizzas', { pizzas });
    } catch (err) {
        res.status(500).send('Помилка при отриманні піцц');
    }
});

module.exports = router;
