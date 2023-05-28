const {
    MONGO_DB_URI,
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_URL,
    AWS_S3_BUCKET,
    PDF_FOLDER
} = process.env;

exports = {
    dbUri: MONGO_DB_URI,
    region: AWS_REGION,
    access: AWS_ACCESS_KEY_ID,
    secret: AWS_SECRET_ACCESS_KEY,
    s3Url: AWS_S3_URL,
    bucket: AWS_S3_BUCKET,
    pdfFolder: PDF_FOLDER
}