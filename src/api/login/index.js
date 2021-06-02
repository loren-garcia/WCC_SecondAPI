const router = require('express').Router();
const servicoLogin = require('../../services/login');

router.post('/login', servicoLogin.login);

module.exports = router;