module.exports = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  s3Dir: process.env.S3_DIR,
  s3Bucket: process.env.S3_BUCKET,
  s3Region: process.env.S3_REGION,
  elasticRegion: process.env.ELASTIC_REGION,
  elasticPipeline: process.env.ELASTIC_PIPELINE,
  elasticPreset: process.env.ELASTIC_PRESET
}
