const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../services/usuarios/Usuario');
const NaoEncontrado = require('../errors/NaoEncontrado');
const LoginInvalido = require('../errors/LoginInvalido');
const bcrypt = require('bcrypt');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');

function conferirUsuario(usuario) {
    if(!usuario) {
        throw new NaoEncontrado();
    }
}

async function conferirSenha(senha, senhaHash) {
    const senhaCorreta = await bcrypt.compare(senha, senhaHash);
    
    if(!senhaCorreta) throw new LoginInvalido();
}

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
            conferirUsuario(usuario);
            await conferirSenha(senha, usuario.senha);
            done(null, usuario);
        } catch(error) {
            done(error);
        }
    })
);

passport.use(
    new BearerStrategy(
        async(token, done) => {
            try {
                const payload = jwt.verify(token, process.env.JWT_KEY);
                const usuario = new Usuario({id: payload.id});
                
                await usuario.buscarPorId();
                done(null, usuario);
            } catch(error) {
                done(error);
            }
        }
    )
)

module.exports = {
    passport
}