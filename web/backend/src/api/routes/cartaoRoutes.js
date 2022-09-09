const express = require('express')
const router = express.Router()
const CartaoController = require('../controllers/cartaoController')

router.post('/cartao/:id', CartaoController.create_cartao)
router.delete('/cartao/:num_cartao', CartaoController.delete_cartao)
router.get('/cartao/:num_cartao', CartaoController.show_cartao)
router.post('/cartao/get/:id', CartaoController.show_cartao_titular)

module.exports = router