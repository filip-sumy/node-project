const express = require('express');
const cors = require('cors');
const pizzasRoutes = require('./routes/pizzas');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/pizzas', pizzasRoutes);
app.use('/api/orders', ordersRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
