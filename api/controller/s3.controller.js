const S3Service = require('../services/s3.service')


exports.getSignedUrl = (req, res) => {
    const {fileName, fileType, bucket} = req.query
    const isPrivateBucket = (bucket !== 'false')

    const data = S3Service.getSignedUrlPut(fileName, fileType, isPrivateBucket)
    return res.status(200).json({
        status: true,
        data,
        message: 'Successfully fetched signedUrl',
      });
}
