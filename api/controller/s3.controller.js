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


exports.getFileContent = async (req, res) => {
    try {
        const file = await S3Service.getFileContent(req.query.key);
        return res.status(200).json({ status: 200, file: file, message: 'Sucess' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: 400, message: err.message });
    }
}