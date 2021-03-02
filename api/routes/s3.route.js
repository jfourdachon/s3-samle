var express = require('express');
const { getSignedUrl } = require('../controller/s3.controller');
const router = express.Router();

router.get('/get-signed-request-put', getSignedUrl)

module.exports = router;
