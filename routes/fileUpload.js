const express = require('express');
const router = express.Router();


//img, vid, imgreduced, localfileupload
const {localFileUpload, imageUpload, imageReducerUpload, videoUpload} = require('../controllers/fileUpload')

//routes
router.post('/localFileUpload', localFileUpload)
router.post('/imageUpload', imageUpload)
router.post('/imageReducerUpload', imageReducerUpload)
router.post('/videoUpload', videoUpload)


module.exports = router;