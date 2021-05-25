const router = require('express').Router();

router.get('/agendamentos', (req, res) => {
    res.send('OK');
});

module.exports = router;