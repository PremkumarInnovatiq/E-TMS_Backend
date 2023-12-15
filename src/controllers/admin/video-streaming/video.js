import multer from 'multer';
import multerS3 from 'multer-s3';
const AWS = require('aws-sdk');
const Video = require('../../../models/video-streaming/video');
const certificateFile= require('../../../models/certificates/certificate-file')
//const certificateFile= require('../../../models/certificates/certificate-file')
const {
    uploadVideoToS3,
    createMediaConvertJob,
    waitForJobCompletion,
    generateCloudFrontUrl,
    generateSignedURL,
    generateCloudFrontUrlImage
} = require('../../../services/video-streaming/video');


const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, 'files-in/' + file.originalname);
        }
    })
}).array('Files');

const upload1 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_CERTIFICATE_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, 'certificates/' + file.originalname);
        }
    })
}).array('Files');
const uploadPrograms = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_CERTIFICATE_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, 'certificates/' + file.originalname);
        }
    })
}).array('Files');
const upload2 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_CERTIFICATE_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, 'files-in/' + file.originalname);
        }
    })
}).array('files');


const uploadVideo = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            console.log('Error uploading video:', err);
            return res.status(500).json({ error: 'An error occurred while uploading the video' });
        }

        try {
            const s3Keys = req.files.map((file) => file.key);
            const inputBucket = process.env.S3_BUCKET;
            const cloudFrontUrls = s3Keys.map((s3Key) => generateCloudFrontUrl(s3Key));
            const videos = req.files.map((file, index) => {
                return {
                    filename: file.originalname,
                    url: cloudFrontUrls[index],
                    inputUrl: file.location,
                    inputBucket: inputBucket,
                };
            });

            const savedVideos = await Video.insertMany(videos);

            res.status(201).json({
                videoIds: savedVideos.map((video) => video._id),
                message: 'Videos uploaded to S3 bucket successfully'
            });
        } catch (error) {
            console.log('Error processing video:', error);
            res.status(500).json({ error: 'An error occurred while processing the videos' });
        }
    });
};
const uploadVideo1 = async (req, res) => {
    upload1(req, res, async function (err) {
        if (err) {
            console.log('Error uploading video:', err);
            return res.status(500).json({ error: 'An error occurred while uploading the video' });
        }

        try {
            const s3Keys = req.files.map((file) => file.key);
            const inputBucket = process.env.S3_BUCKET;
            const cloudFrontUrls = s3Keys.map((s3Key) => generateCloudFrontUrl(s3Key));
            const videos = req.files.map((file, index) => {
                return {
                    filename: file.originalname,
                    url: cloudFrontUrls[index],
                    inputUrl: file.location,
                    inputBucket: inputBucket,
                };
           });

           console.log("ssssssssssss",videos)
            //const savedVideos = await Video.insertMany(videos);

            res.status(201).json({
                inputUrl: videos[0].inputUrl,
                filename:videos[0].filename,
                
                message: 'Videos uploaded to S3 bucket successfully'
            });
        } catch (error) {
            console.log('Error processing video:', error);
            res.status(500).json({ error: 'An error occurred while processing the videos' });
        }
    });
};
const uploadImage = async (req, res) => {
    upload2(req, res, async function (err) {
        if (err) {
            console.log('Error uploading image:', err);
            return res.status(500).json({ error: 'An error occurred while uploading the image' });
        }

        try {
            const s3Keys = req.files.map((file) => file.key);
            const inputBucket = process.env.S3_CERTIFICATE_BUCKET;
            const cloudFrontUrls = s3Keys.map((s3Key) => generateCloudFrontUrlImage(s3Key));
            const videos = req.files.map((file, index) => {
                return {
                    filename: file.originalname,
                    url: cloudFrontUrls[index],
                    inputUrl: file.location,
                    inputBucket: inputBucket,
                };
            });

            const savedVideos = await certificateFile.insertMany(videos);

            res.status(201).json({
                imageIds: savedVideos.map((video) => video._id),
                message: 'Image uploaded to S3 bucket successfully'
            });
        } catch (error) {
            console.log('Error processing image:', error);
            res.status(500).json({ error: 'An error occurred while processing the images' });
        }
    });
};
const uploadProgram = async (req, res) => {
    uploadPrograms(req, res, async function (err) {
        if (err) {
            console.log('Error uploading image:', err);
            return res.status(500).json({ error: 'An error occurred while uploading the image' });
        }

        try {
            const s3Keys = req.files.map((file) => file.key);
            const inputBucket = process.env.S3_CERTIFICATE_BUCKET;
            const cloudFrontUrls = s3Keys.map((s3Key) => generateCloudFrontUrlImage(s3Key));
            const videos = req.files.map((file, index) => {
                return {
                    filename: file.originalname,
                    url: cloudFrontUrls[index],
                    inputUrl: file.location,
                    inputBucket: inputBucket,
                };
            });

            const savedVideos = await Video.insertMany(videos);

            res.status(201).json({
                videoIds: savedVideos.map((video) => video._id),
                message: 'Image uploaded to S3 bucket successfully'
            });
        } catch (error) {
            console.log('Error processing image:', error);
            res.status(500).json({ error: 'An error occurred while processing the images' });
        }
    });
};




const uploadCourseThumbnail = async (req, res) => {
    upload2(req, res, async function (err) {
        if (err) {
            console.log('Error uploading image:', err);
            return res.status(500).json({ error: 'An error occurred while uploading the image' });
        }

        try {
            const s3Keys = req.files.map((file) => file.key);
            const inputBucket = process.env.S3_CERTIFICATE_BUCKET;
            const cloudFrontUrls = s3Keys.map((s3Key) => generateCloudFrontUrlImage(s3Key));
            const videos = req.files.map((file, index) => {
                return {
                    filename: file.originalname,
                    url: cloudFrontUrls[index],
                    image_link: file.location,
                    inputBucket: inputBucket,
                };
            });

            // const savedVideos = await certificateFile.insertMany(videos);

            res.status(201).json({
                image_link: videos[0].image_link,
                message: 'Image uploaded to S3 bucket successfully'
            });
        } catch (error) {
            console.log('Error processing image:', error);
            res.status(500).json({ error: 'An error occurred while processing the images' });
        }
    });
};




const convertVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        const inputBucket = process.env.S3_INPUT_BUCKET;
        const inputKey = video.filename;
        const jobTemplateName = req.body.jobTemplateName;

        const jobId = await createMediaConvertJob(inputBucket, inputKey, jobTemplateName);
        video.jobId = jobId;
        video.status = 'Converting';
        await video.save();


        await waitForJobCompletion(jobId);

        video.status = 'Completed';
        await video.save();

        const params = {
            Bucket: inputBucket,
            Key: video.filename
        };
        await s3.deleteObject(params).promise();

        res.status(200).json({
            videoId: video._id,
            message: 'Video converted successfully'
        });
    } catch (error) {
        console.log('Error converting video:', error);
        res.status(500).json({ error: 'An error occurred while converting the video' });
    }
};



const convertVideos = async (req, res) => {
    try {
      const { videoIds, jobTemplateName } = req.body;
  
      if (!Array.isArray(videoIds) || videoIds.length === 0) {
        return res.status(400).json({ error: 'No videoIds provided' });
      }
  
      for (const videoId of videoIds) {
        // console.log(`Converting video with ID: ${videoId}`);
  
        const video = await Video.findById(videoId);
  
        if (!video) {
          console.log(`Video with ID ${videoId} not found`);
          continue;
        }
  
        const inputBucket = process.env.S3_INPUT_BUCKET;
        const inputKey = video.filename;
  
        const jobId = await createMediaConvertJob(inputBucket, inputKey, jobTemplateName);
        video.jobId = jobId;
        video.status = 'Converting';
        await video.save();
  
        await waitForJobCompletion(jobId);
  
        video.status = 'Completed';
        await video.save();
  
        const params = {
          Bucket: inputBucket,
          Key: video.filename
        };
        await s3.deleteObject(params).promise();
      }
  
      res.status(200).json({
        message: 'Videos converted successfully'
      });
    } catch (error) {
      console.log('Error converting videos:', error);
      res.status(500).json({ error: 'An error occurred while converting the videos' });
    }
  };
  



const getVideoLink = async (req, res) => {
    try {
        const { videoId } = req.params;

        let video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        if (video.status === 'Completed') {
            // const outputBucket = process.env.S3_OUTPUT_BUCKET;
            const outputFile = process.env.CLOUDFRONT_DOMAIN + `/files-out/${video.filename.split('.')[0]}.m3u8`;
            // const signedUrl = generateSignedURL({ cfURL: outputFile })
            // const s3Loc = `files-out/${video.filename.split('.')[0]}.m3u8`;
            video = { ...video, videoUrl:  outputFile};
        }
        res.status(200).json({
            status: 'success',
            data: video
        });
    } catch (error) {
        console.log('Error getting video link:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the video link' });
    }
};
const getUploadedVideos = async (req, res) => {
    try {
      const videos = await Video.find({ status: 'Pending' }).select('_id filename');
      res.status(200).json({
        status: 'success',
        data: videos.map(video => ({ _id: video._id, filename: video.filename })),
      });
    } catch (error) {
      console.log('Error getting uploaded videos:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the uploaded videos' });
    }
  };
  



const getSignedURL = async (req, res) => {
    try {
        const { url } = req.query
        if (!url) {
            return res.status(400).json({ error: 'url not found' });
        }
        const signedUrl = generateSignedURL({ cfURL: url })
        res.status(200).json({
            status: 'success',
            data: signedUrl
        });
    } catch (error) {
        console.log('Error getting signed link:', error);
        res.status(500).json({ error: 'An error occurred while generate the signed video link' });
    }
}

module.exports = {
    uploadVideo,
    getVideoLink,
    convertVideo,
    convertVideos,
    getSignedURL,
    getUploadedVideos ,
    uploadImage,
    upload2,
    uploadCourseThumbnail,
    uploadProgram,
    uploadVideo1
};