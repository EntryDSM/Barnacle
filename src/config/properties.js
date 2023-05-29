const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = {
    dbUri: env.MONGO_DB_URI,
    awsRegion: env.AWS_REGION,
    awsAccess: env.AWS_ACCESS_KEY_ID,
    awsSecret: env.AWS_SECRET_ACCESS_KEY,
    s3Url: env.AWS_S3_URL,
    bucket: env.AWS_S3_BUCKET,
    pdfFolder: env.PDF_FOLDER,
    secret: env.SECRET
}