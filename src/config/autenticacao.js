const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../services/usuarios/Usuario');
const passport = require('passport');

passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    },
    async (email, senha, done) => {
        try {
            const usuario = new Usuario({email: email});

            await usuario.buscarPorEmail();
        } catch(error) {
            done(error);
        }
    })
)