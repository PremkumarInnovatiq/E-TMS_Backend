import Template from '../models/aws-job-template'


const storeJobTemplateInDB = async (templateName, templateArn) => {
    try {
        const template = new Template({
            name: templateName,
            arn: templateArn,
        });
        const savedTemplate = await template.save();
        console.log('Job template stored in MongoDB successfully.');

        return savedTemplate;
    } catch (error) {
        console.log('Error storing job template in MongoDB:', error);
        throw error;
    }
};

const getAllJobTemplates = async () => {
    try {
        const templates = await Template.find();
        console.log('Retrieved all job templates from MongoDB successfully.');
        return templates;
    } catch (error) {
        console.log('Error retrieving job templates from MongoDB:', error);
        throw error;
    }
};


module.exports = {
    storeJobTemplateInDB,
    getAllJobTemplates

};