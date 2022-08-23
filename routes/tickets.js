const express = require('express');
const {sendTicket} = require('../controllers/tickets')
const router = express.Router();


router.route('/sendTicket/:userId').post(sendTicket)

module.exports = router