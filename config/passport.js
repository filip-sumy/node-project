const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const users = require('../users');
const keys = require('./keys');

module.exports = function (passport) {
    // Локальна стратегія
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return done(null, false, { message: 'Невірна пошта або пароль' });
        return done(null, user);
    }));

    // Google стратегія
    passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL
    }, (accessToken, refreshToken, profile, done) => {
        let user = users.find(u => u.googleId === profile.id);
        if (!user) {
            user = {
                id: Date.now().toString(),
                googleId: profile.id,
                email: profile.emails[0].value
            };
            users.push(user);
        }
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        const user = users.find(u => u.id === id);
        done(null, user);
    });
};
