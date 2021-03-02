const { getSignedUrlPut } = require("../service/s3");


exports.getSignedUrl = (req, res) => {
    const {fileName, fileType, bucket} = req.query
    console.log(typeof bucket)
    console.log(bucket)
    const publicBucket = (bucket !== 'false')

    const data = getSignedUrlPut(fileName, fileType, publicBucket)
    console.log({data})
    return res.status(200).json({
        status: true,
        data,
        message: 'Successfully fetched signedUrl',
      });
}
