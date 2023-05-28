const dotenv = require('dotenv');
const env = dotenv.config().parsed;

module.exports = {
    dbUri: env.MONGO_DB_URI,
    region: env.AWS_REGION,
    access: env.AWS_ACCESS_KEY_ID,
    secret: env.AWS_SECRET_ACCESS_KEY,
    s3Url: env.AWS_S3_URL,
    bucket: env.AWS_S3_BUCKET,
    pdfFolder: env.PDF_FOLDER
}