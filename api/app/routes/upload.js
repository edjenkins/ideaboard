const configS3 = require('../../config/s3.js')

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const mime = require('mime')
const crypto = require('crypto')

const s3 = new aws.S3({
  accessKeyId: configS3.accessKeyId,
  secretAccessKey: configS3.secretAccessKey
})

const S3_DIR = configS3.dir
const S3_BUCKET = configS3.bucket

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    cacheControl: 'max-age=31536000', // Cache for a year
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) console.error(err)
        cb(null, S3_DIR + '/' + raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
      })
    }
  })
})

module.exports = function (app, passport) {
  app.post('/upload', upload.single('upload'),
    (req, res, next) => {
      // if (req.isAuthenticated()) {
      console.log(req)
      res.json({
        status: 'success',
        upload: req.file
      })
      // res.send('Successfully uploaded ' + req.files.length + ' files!')
      // } else {
      //   res.status(401);
      // }
    })
}
