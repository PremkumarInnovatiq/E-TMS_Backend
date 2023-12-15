const router = require('express').Router();
var videoController = require('../../../controllers/admin/video-streaming/video');


router.route('/').post(videoController.uploadVideo)
router.route('/upload').post(videoController.uploadVideo1)
router.route('/uploadImage').post(videoController.uploadImage)
router.route('/uploadProgram').post(videoController.uploadProgram)
router.route('/uploadCourseThumbnail').post(videoController.uploadCourseThumbnail)

router.route('/').get(videoController.getUploadedVideos)
router.route('/convert/:videoId').post(videoController.convertVideo);
router.route('/convert/').post(videoController.convertVideos);
router
    .route('/signed/url')
    .get(videoController.getSignedURL);
    
router
    .route('/:videoId')
    .get(videoController.getVideoLink);




module.exports = router;