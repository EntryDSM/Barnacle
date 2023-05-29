module.exports = {
    dbUri: process.env.MONGO_DB_URI,
    awsRegion: process.env.AWS_REGION,
    awsAccess: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY,
    s3Url: process.env.AWS_S3_URL,
    bucket: process.env.AWS_S3_BUCKET,
    pdfFolder: process.env.PDF_FOLDER,
    secret: process.env.SECRET
}