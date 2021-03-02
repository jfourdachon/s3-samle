var express = require('express');
const s3Controller = require('../controller/s3.controller');
const router = express.Router();

router.get('/get-signed-request-put', s3Controller.getSignedUrl)

module.exports = router;
