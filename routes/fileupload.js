const express = require('express');
const router = express.Router();
const { uploadFile, imageUpload, videoUpload } = require('../controllers/Fileupload');

router.post('/upload', uploadFile);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);  // Corrected typo

module.exports = router;
