const express =  require('express')
const {uploadEvent, getAllEvents, getEventById, getEventsByHost, deleteEventById, updateEventById} = require('../controllers/event')
const router = express.Router();

router.route('/uploadEvent').post(uploadEvent);
router.route('/getAllEvents').get(getAllEvents);
router.route('/getEventbyId/:eventId').get(getEventById);
router.route('/getEventsByHost/:hostId').get(getEventsByHost);
router.route('/deleteEventById/:eventId').delete(deleteEventById);
router.route('/updateEventById/:eventId').put(updateEventById);

module.exports = router;