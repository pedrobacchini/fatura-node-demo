const express = require('express');
const router = express.Router();

const fatura_controller = require('../controllers/fatura.controller');


//Rotas para os recursos relacionados a fatura
router.get('/', fatura_controller.all);

router.get('/:id', fatura_controller.details);

router.post('/',fatura_controller.create);

router.put('/:id', fatura_controller.update);

router.delete('/:id', fatura_controller.delete);

module.exports = router;