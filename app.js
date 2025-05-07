const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_secret_key';

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware для теми
app.use((req, res, next) => {
    res.locals.theme = req.cookies.theme || 'light';
    next();
});

// Middleware перевірки JWT
function verifyJWT(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}

// Маршрути
app.get('/', (req, res) => {
    res.render('index', { theme: res.locals.theme });
});

app.get('/ejs', (req, res) => {
    res.render('index.ejs', { theme: res.locals.theme });
});

app.post('/set-theme', (req, res) => {
    const theme = req.body.theme;
    res.cookie('theme', theme, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect(req.headers.referer || '/');
});

app.post('/register', (req, res) => {
    const { username } = req.body;
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.send('User registered and token set');
});

app.get('/protected', verifyJWT, (req, res) => {
    res.send(`Welcome, ${req.user.username}`);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
