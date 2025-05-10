const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../users');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) return res.send('Користувач вже існує');
    users.push({ id: Date.now().toString(), email, password });
    res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

// Забув пароль
router.get('/forgot', (req, res) => res.render('forgot'));
router.post('/forgot', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.send('Користувача не знайдено');

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 година

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Скидання пароля',
        text: `Перейдіть за посиланням для скидання пароля: http://localhost:3000/reset/${token}`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) return res.send('Помилка при відправленні листа');
        res.send('Інструкції надіслані на вашу електронну пошту');
    });
});

router.get('/reset/:token', (req, res) => {
    const user = users.find(u => u.resetToken === req.params.token && u.resetTokenExpiry > Date.now());
    if (!user) return res.send('Токен недійсний або строк дії вичерпано');
    res.render('reset', { token: req.params.token });
});

router.post('/reset/:token', (req, res) => {
    const user = users.find(u => u.resetToken === req.params.token && u.resetTokenExpiry > Date.now());
    if (!user) return res.send('Токен недійсний або строк дії вичерпано');

    user.password = req.body.password;
    delete user.resetToken;
    delete user.resetTokenExpiry;
    res.send('Пароль успішно змінено');
});

module.exports = router;
