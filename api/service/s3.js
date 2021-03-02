const aws = require('aws-sdk');

exports.getSignedUrlPut = (filePath, fileType, bucket) => {
  aws.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
  });

  try {
    if (!bucket) {
      bucket = process.env.AWS_S3_BUCKET_PUBLIC;
    } else {
      bucket = process.env.AWS_S3_BUCKET_PRIVATE;
    }
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: bucket,
      Key: filePath,
      Expires: 3600,
      ContentType: fileType,
    };
    const signedUrl = s3.getSignedUrl('putObject', s3Params);
    console.log({ signedUrl });
    return signedUrl;
  } catch (err) {
    console.log(err);
    // return ApiService.returnFormat(false, 'getSignedUrlPut', 'other-error', err.message);
  }
};
