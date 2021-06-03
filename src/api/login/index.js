const passport = require('passport');
const router = require('express').Router();
const servicoLogin = require('../../services/login');

router.post('/login', passport.authenticate('local', { session: false }),
servicoLogin.login);

module.exports = router;