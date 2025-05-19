require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

require('./config/passport')(passport);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false // Зробіть true при використанні HTTPS
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/oauth'));
app.use('/', require('./routes/protected'));
app.use('/', require('./routes/posts'));
connectDB();
app.listen(3000, () => console.log('Сервер працює на http://localhost:3000'));
