const express = require('express');
const router = express.Router();

const orders = [];

router.post('/', (req, res) => {
  const { name, address, cart } = req.body;
  if (!name || !address || !cart?.length) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const newOrder = { id: Date.now(), name, address, cart };
  orders.push(newOrder);
  res.status(201).json({ message: 'Замовлення прийнято!', order: newOrder });
});

module.exports = router;
