const express = require('express')
const {payStack} = require('../controllers/pay')
const {handleWebhook} = require('../controllers/webhook')
const router = express.Router();


router.route('/pay/:userId').post(payStack);

router.route('/pay/webhook').post(handleWebhook);


module.exports = router