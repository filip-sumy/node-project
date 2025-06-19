const express = require('express');
const router = express.Router();
const pizzas = require('../data/pizzas.json');

router.get('/', (req, res) => {
  res.json(pizzas);
});

module.exports = router;
