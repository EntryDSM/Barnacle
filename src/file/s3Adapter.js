const AWS = require('aws-sdk');
const properties = require('../config/properties')

AWS.config.update({
    accessKeyId: properties.access,
    secretAccessKey: properties.secret,
    region: properties.region
});
var s3 = new AWS.S3();

exports.savePdfFile = (fileName, fileData) => {
    const key = properties.pdfFolder + fileName
    s3.putObject({
        Bucket: properties.bucket,
        Key: key,
        Body: fileData
    }, (err, data) => {
       err ? reject(err): resolve(data);
    });
    return key
}