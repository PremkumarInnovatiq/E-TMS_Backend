import multer from 'multer';
const path = require('path');
const excelFilter = function (req, file, cb) {
	if (!file.originalname.match(/\.(xlsx)$/)) {
		req.fileValidationError = 'Only xlsx files are allowed!';
		return cb(new Error('Only Excel files are allowed!'), false);
	}
	cb(null, true);
};

const videoFilter = function (req, file, cb) {
	if (!file.originalname.match(/\.(mp4|webm)$/)) {
		req.fileValidationError = 'Only mp4 and mkv files are allowed!';
		return cb(new Error('Only mp4 and mkv files are allowed!'), false);
	}
	cb(null, true);
};

const imageFilter = function (req, file, cb) {
	if (!file.originalname.match(/\.(png|jpg)$/)) {
		req.fileValidationError = 'Only png and jpg files are allowed!';
		return cb(new Error('Only png and jpg files are allowed!'), false);
	}
	cb(null, true);
};

const validateFileType = function (fileType, req, file, cb) {
	if (fileType === 'excel') {
		return excelFilter(req, file, cb);
	} else if (fileType === 'video') {
		return videoFilter(req, file, cb);
	} else if (fileType === 'image') {
		return imageFilter(req, file, cb);
	}
}


const fileUpload = function upload(destinationPath, fileType = "excel") {
	return multer({
		fileFilter: function (req, file, cb) {
			validateFileType(fileType, req, file, cb);
		},
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, destinationPath);
			},
			filename: function (req, file, cb) {
				cb(null, Date.now() + path.extname(file.originalname));
			},
		}),
	});
};
export default fileUpload;
