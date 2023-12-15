import { storeJobTemplateInDB, getAllJobTemplates } from '../../services/aws-job-template'


const createTemplate = async (req, res) => {
    try {
        const { templateName, templateArn } = req.body;
        const template = await storeJobTemplateInDB(templateName, templateArn);
        res.status(201).json({
            templateId: template._id,
            templateName: template.name,
            message: 'Job template created and stored in MongoDB.'
        });
    } catch (error) {
        console.log('Error creating job template:', error);
        res.status(500).json({ error: 'An error occurred while creating the job template.' });
    }
};

const getAllTemplates = async (req, res) => {
    try {
        const templates = await getAllJobTemplates();
        res.status(200).json({ templates });
    } catch (error) {
        console.log('Error retrieving job templates:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the job templates.' });
    }
};

module.exports = {
    createTemplate,
    getAllTemplates
};