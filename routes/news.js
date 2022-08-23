const express = require('express')
const {addNews, getAllNews, getNewsById, getSliderNews, getNewsByCategory, deleteNewsById, updateNewsById} = require ('../controllers/news')
const router = express.Router()
// middleware to be here

router.route('/addNews').post(addNews);
router.route('/getAllNews/:pageNo/:pageSize').get(getAllNews)
router.route('/getById/:newsId').get(getNewsById);
router.route('/getAllNews/slider').get(getSliderNews);
router.route('/getByCategory/:catId').get(getNewsByCategory);
router.route('/deleteNewsById/:newsId').delete(deleteNewsById);
router.route('/updateNewsById/:newsId').put(updateNewsById)
module.exports = router 