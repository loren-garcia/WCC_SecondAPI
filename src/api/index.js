const router = require('express').Router();
const servicoAgendamento = require('../services');

router.get('/agendamentos', (req, res) => {
    res.send('OK');
});

router.get('/agendamentos/:id', servicoAgendamento.carregarAgendamento);

router.post('/agendamentos', servicoAgendamento.criarAgendamento)

module.exports = router;