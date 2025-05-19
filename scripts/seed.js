const mongoose = require('mongoose');
const Pizza = require('../models/Pizza');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Pizza.deleteMany();

        await Pizza.insertMany([
            { name: 'Маргарита', ingredients: ['сир', 'томатний соус'], price: 99 },
            { name: 'Пепероні', ingredients: ['пепероні', 'сир', 'соус'], price: 119 },
            { name: 'Гавайська', ingredients: ['шинка', 'ананас', 'сир'], price: 109 },
        ]);

        console.log('✅ Піцци додано');
        process.exit();
    })
    .catch(err => console.error(err));
