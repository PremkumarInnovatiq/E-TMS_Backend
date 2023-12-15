const router = require('express').Router();
const { createTemplate, getAllTemplates } = require('../../controllers/admin/aws-job-template');


router.post('/templates', createTemplate);

router.get('/templates', getAllTemplates)


module.exports = router;