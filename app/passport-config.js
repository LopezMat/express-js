const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/userScheme');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'Email et/ou mot de passe incorrect' });
            }

            const isMatch = await user.comparePassword(password);

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Email et/ou mot de passe incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;