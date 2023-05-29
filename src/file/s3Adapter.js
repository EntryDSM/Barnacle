const AWS = require('aws-sdk');
const properties = require('../config/properties')

AWS.config.update({
    accessKeyId: properties.access,
    secretAccessKey: properties.secret,
    region: properties.region
});
var s3 = new AWS.S3();

exports.savePdfFile = async (fileName, fileData) => {
    const key = properties.pdfFolder + fileName
    await s3.upload( {
        Bucket: properties.bucket,
        Key: key,
        Body: fileData
    }).promise()
    .then((data) => {
        console.log('Upload Success! : ', data.Location);
    })
    .catch((error) => {
        console.error(error);
    });
    return key
}