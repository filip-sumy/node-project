const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../authMiddleware');

router.get('/protected', ensureAuthenticated, (req, res) => {
    res.send(`Привіт, ${req.user.email || 'користувач'}! Ви на захищеній сторінці.`);
});

module.exports = router;
