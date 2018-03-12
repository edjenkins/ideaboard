const configS3 = require('../../config/s3.js')

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const mime = require('mime')
const crypto = require('crypto')

const url = require('url')
const http = require('http')
const sizeOf = require('image-size')

const s3 = new aws.S3({
  accessKeyId: configS3.accessKeyId,
  secretAccessKey: configS3.secretAccessKey
})

const S3_DIR = configS3.dir
const S3_BUCKET = configS3.bucket

const getContentType = function (req, file, cb) {
  switch (file.mimetype) {
    case 'image/svg+xml':
      return 'image/svg+xml'
  
    default:
      return 'auto'
  }
}

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    contentType: (req, file, cb) => {
      switch (file.mimetype) {
        case 'image/svg+xml':
          return cb(null, 'image/svg+xml')

        default:
          return multerS3.AUTO_CONTENT_TYPE(req, file, cb)
      }
    },
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
    async (req, res, next) => {

      // Log uploaded file details
      console.log(req.file.mimetype)
      
      if (req.file.mimetype.startsWith('image')) {
        const imgUrl = req.file.location.replace('https', 'http')
        const options = url.parse(imgUrl)
        const dimensionsPromise = new Promise(resolve => {
          http.get(options, function (response) {
            var chunks = []
            response.on('data', function (chunk) {
              chunks.push(chunk)
            }).on('end', function () {
              try {
                var buffer = Buffer.concat(chunks)
                resolve(sizeOf(buffer))
              } catch (error) {
                resolve()
              }
            }).on('error', function (err) {
              console.log(err)
              resolve()
            })
          })
        })

        // Store dimensions
        req.file.dimensions = await dimensionsPromise
      }

      res.json({
        status: 'success',
        upload: req.file
      })
    })
}
