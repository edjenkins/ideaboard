const configAWS = require('../../config/aws.js')

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const mime = require('mime')
const crypto = require('crypto')

const url = require('url')
const http = require('http')
const sizeOf = require('image-size')

const s3 = new aws.S3({
  accessKeyId: configAWS.accessKeyId,
  secretAccessKey: configAWS.secretAccessKey,
  region: configAWS.s3Region
})

const S3_DIR = configAWS.s3Dir
const S3_BUCKET = configAWS.s3Bucket
const ELASTIC_REGION = configAWS.elasticRegion
const ELASTIC_PIPELINE = configAWS.elasticPipeline
const ELASTIC_PRESET = configAWS.elasticPreset

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    limits: {
      fileSize: 52428800
    },
    contentType: (req, file, cb) => {
      console.log(req)
      console.log(file)
      
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
      console.log(req.file)
      console.log(req.file.mimetype)
      
      // Images
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

      // Videos
      if (req.file.mimetype.startsWith('video')) {
        aws.config.update({ region: ELASTIC_REGION })
        const transcoder = new aws.ElasticTranscoder({
          accessKeyId: configAWS.accessKeyId,
          secretAccessKey: configAWS.secretAccessKey,
          region: configAWS.elasticRegion
        })
        const inputKey = req.file.key
        let key = inputKey.substr(0, inputKey.lastIndexOf('.'))
        key = key.replace('uploads/', '')
        
        const jobResult = await transcoder.createJob({
          PipelineId: ELASTIC_PIPELINE,
          // InputKeyPrefix: '/uploads',
          OutputKeyPrefix: 'encoded/',
          Input: {
            Key: inputKey,
            FrameRate: 'auto',
            Resolution: 'auto',
            AspectRatio: 'auto',
            Interlaced: 'auto',
            Container: 'auto'
          },
          Outputs: [
            {
              Key: `${key}.mp4`,
              ThumbnailPattern: `${key}-{count}`,
              PresetId: ELASTIC_PRESET
            },
            {
              Key: `${key}.webm`,
              PresetId: '1351620000001-100240'
            },
            {
              Key: `${key}.fmp4`,
              PresetId: '1351620000001-500040',
              SegmentDuration: '10'
            }
          ],
          Playlists: [
            {
              Format: 'MPEG-DASH', // Format: 'HLSv3|HLSv4|MPEG-DASH|Smooth',
              Name: `${key}-mpeg-dash`,
              OutputKeys: [
                `${key}.fmp4`
              ]
            }
          ],
        }, (err, data) => {
          if (err) console.error(err)
          console.log(data)
        })
        console.log(jobResult)
      }

      res.json({
        status: 'success',
        upload: req.file
      })
    })
}
