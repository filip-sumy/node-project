const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /posts — отримання та відображення всіх постів
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render('posts', { posts });
  } catch (err) {
    console.error('❌ Помилка при отриманні постів:', err);
    res.status(500).send('Помилка сервера');
  }
});

module.exports = router;
