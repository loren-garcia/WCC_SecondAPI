const router = require('express').Router();
const servicoUsuario = require('../../services/usuarios');

router.get('/usuarios', servicoUsuario.carregarTodosUsuarios);

router.post('/usuarios', servicoUsuario.criarUsuario);

router.get('/usuarios/:id', servicoUsuario.carregarUsuario);

router.delete('/usuarios/:id', servicoUsuario.delete);

router.put('/usuarios/:id', servicoUsuario.alterarUsuario);

module.exports = router;