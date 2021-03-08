const aws = require('aws-sdk');


exports.getSignedUrlPut = (filePath, fileType, isPrivateBucket) => {

    aws.config.update({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        region: process.env.AWS_S3_REGION,
      });
        
      
  try {
    const bucket = !isPrivateBucket ? process.env.AWS_S3_BUCKET_PUBLIC :process.env.AWS_S3_BUCKET_PRIVATE;
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: bucket,
      Key: filePath,
      Expires: 3600,
      ContentType: fileType,
    };
    const signedUrl = s3.getSignedUrl('putObject', s3Params);
    return signedUrl;
  } catch (err) {
    console.log(err);
  }
};


exports.getFileContent = async (filePath, isPrivateBucket = false) => {

    aws.config.update({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        region: process.env.AWS_S3_REGION,
      });        
      
    try {
        const bucket = !isPrivateBucket ? process.env.AWS_S3_BUCKET_PUBLIC :process.env.AWS_S3_BUCKET_PRIVATE;

        const s3 = new aws.S3();
        const s3Params = {
            Bucket: bucket,
            Key: filePath,
        };
        const data = await s3.getObject(s3Params).promise();

        return data.Body;
    } catch (err) {
        console.log(err.message);
        throw Error('Error while getFileContent');
    }
}