const express = require('express')
const {payStack} = require('../controllers/pay')
const router = express.Router();


router.route('/pay/:userId').post(payStack)


module.exports = router