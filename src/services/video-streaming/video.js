const AWS = require('aws-sdk');
const cfsign = require('aws-cloudfront-sign');
import Template from '../../models/aws-job-template'


AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});



const s3 = new AWS.S3();
const mediaconvert = new AWS.MediaConvert({ endpoint: process.env.MEDIA_CONVERT_ENDPOINT });


const uploadVideoToS3 = async (inputBucket, videoKey, videoStream) => {
    try {
        const params = {
            Bucket: inputBucket,
            Key: videoKey,
            Body: videoStream
        };
        await s3.upload(params).promise();
        console.log('Video uploaded successfully to S3');
    } catch (error) {
        console.log('Error uploading video to S3:', error);
        throw error;
    }
};

const createMediaConvertJob = async (inputBucket, inputKey, jobTemplateName) => {
    try {
        const queue = process.env.MEDIA_CONVERT_QUEUE_ARN;

        const template = await Template.findOne({ name: jobTemplateName });
        if (!template) {
            throw new Error('Job template not found');
        }

        const jobParams = {
            JobTemplate: template.arn,
            Queue: queue,
            UserMetadata: {
                key: 'value'
            },
            Role: process.env.MEDIA_CONVERT_ROLE_ARN,
            Settings: {
                Inputs: [
                    {
                        FileInput: `s3://${inputBucket}/${inputKey}`
                    }
                ],
                OutputGroups: [
                    {
                        Name: 'HLS Output',
                        OutputGroupSettings: {
                            Type: 'HLS_GROUP_SETTINGS',
                            HlsGroupSettings: {
                                ManifestDurationFormat: 'FLOATING_POINT',
                                SegmentControl: 'SINGLE_FILE',
                                ManifestCompression: 'NONE',
                                OutputSelection: 'MANIFESTS_AND_SEGMENTS'
                            }
                        },
                        Outputs: [
                            {
                                Extension: 'm3u8',
                                NameModifier: '_output',
                                ContainerSettings: {
                                    Container: 'M3U8',
                                    M3u8Settings: {}
                                }
                            }
                        ]
                    }
                ]
            }
        };

        const createJobResponse = await mediaconvert.createJob(jobParams).promise();
        const jobId = createJobResponse.Job.Id;
        console.log('MediaConvert job created with ID:', jobId);
        return jobId;
    } catch (error) {
        console.log('Error creating MediaConvert job:', error);
        throw error;
    }
};

const waitForJobCompletion = async (jobId) => {
    try {
        const getJobParams = {
            Id: jobId
        };

        let jobData;
        do {
            jobData = await mediaconvert.getJob(getJobParams).promise();
            const { Status: status } = jobData.Job;

            if (status === 'COMPLETE') {
                console.log('Job completed successfully!');
                return;
            }

            if (status === 'ERROR') {
                console.log('Job encountered an error:', jobData.Job.ErrorMessage);
                throw new Error('Job failed');
            }

            await new Promise((resolve) => setTimeout(resolve, 5000));
        } while (true);
    } catch (error) {
        throw error;
    }
};

const generateCloudFrontUrl = (filename) => {
    const distributionDomain = process.env.CLOUDFRONT_DOMAIN;
    const url = `${distributionDomain}/files-out/`;
    return url;
};
const generateCloudFrontUrlImage = (filename) => {
    const distributionDomain = process.env.CLOUDFRONT_DOMAIN;
    const url = `${distributionDomain}/certificates/`;
    return url;
};


const generatePreSignedURL = ({ bucket, key, expires }) => {
    const signedUrl = s3.getSignedUrl("getObject", {
        Key: key,
        Bucket: bucket,
        Expires: expires || 900, // S3 default is 900 seconds (15 minutes)
    });
    return signedUrl;
};

const generateSignedURL = ({ cfURL, expires }) => {

    const currentDate = new Date();
    let newDate = new Date()
    newDate.setMinutes(currentDate.getMinutes() + process.env.AWS_VOD_TIME_MIN)
    const expireTime = newDate.getTime()
    const signingParams = {
        keypairId: process.env.PUBLIC_KEY_ID,
        // privateKeyString: process.env.PRIVATE_KEY,
        privateKeyPath: "private_key.pem",
        expireTime
    }
    const signedURL = cfsign.getSignedUrl(cfURL, signingParams);
    return signedURL
}

const getUploadedVideos = async (Video) => {
    try {
        const videos = await Video.find({ status: "Pending" }).select('filename');
        return videos.map(video => video.filename);
    } catch (error) {
        console.log('Error getting uploaded videos:', error);
        throw error;
    }
};


module.exports = {
    uploadVideoToS3,
    createMediaConvertJob,
    waitForJobCompletion,
    generateCloudFrontUrl,
    generateSignedURL,
    generatePreSignedURL,
    getUploadedVideos,
    generateCloudFrontUrlImage

};
