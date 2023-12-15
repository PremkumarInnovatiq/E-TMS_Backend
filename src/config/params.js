import config from './config.json';
const app = {
	hosted_domain: process.env.HOSTED_DOMAIN || '',
	secret: process.env.NAME || '',
	dburi: process.env.MONGODB_URL || '',
	aws_access_key: process.env.ACCESS_KEY_ID || '',
	aws_secret_key: process.env.SECRET_ACCESS_KEY || '',
	s3_region: process.env.AWS_REGION || '',
	s3_bucket: process.env.S3_BUCKET || '',
	from_email: process.env.FROM_EMAIL || 'kjvaghasiyadev@gmail.com',
	config: config[process.env.NODE_ENV ? process.env.NODE_ENV : "developemnt"],
	encryption_key: process.env.ENC_SECRET_KEY || 'My$EcrtP@$$w04d=',
};
module.exports = app;
