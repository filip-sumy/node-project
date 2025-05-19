const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas підключено');
  } catch (err) {
    console.error('❌ Помилка підключення до MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
