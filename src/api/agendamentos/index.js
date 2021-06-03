const router = require('express').Router();
const servicoAgendamento = require('../../services/agendamentos');
const passport = require('passport');

router.get('/agendamentos', passport.authenticate('bearer', { session: false }), servicoAgendamento.carregarTodosAgendamentos);

router.get('/agendamentos/:id', servicoAgendamento.carregarAgendamento);

router.post('/agendamentos', servicoAgendamento.criarAgendamento);

router.delete('/agendamentos/:id', servicoAgendamento.deletarAgendamento);

router.put('/agendamentos/:id', servicoAgendamento.alterarAgendamento);

module.exports = router;