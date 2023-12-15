/* eslint-disable node/no-unsupported-features/es-syntax */
const router = require('express').Router();
const auth = require('../../controllers/auth');
//import video from '../../controllers/admin/video-streaming/video';
import upload from "../../config/multer";



import sanatizeUserType from '../../middleware/sanatizeUserType';
import {
	RegisterOrCreateUserValidation,
	validateLogin,
	UserEditValidation,
} from '../../middleware/validators/userValidations';

router.post('/login', validateLogin, auth.login);
router.put('/instructorConfirm/:id',auth.instructorConfrim);
router.post('/instructorCreate',auth.instructorCreate);
router.get('/instructorListByID/:id',auth.instructorById);
router.post('/instructorList',auth.instructorList);
router.put('/instructorUpdate/:id',auth.instructorUpdate);
router.delete('/instructorDelete/:id',auth.instructorDelete);





router.post('/UserCreate',auth.userCreate);
//router.post('/instructorCreate',auth.Create);
router.post('/social-login', auth.socialLogin);
router.post('/logout', auth.logout);
router.post('/register', sanatizeUserType, RegisterOrCreateUserValidation, auth.signup);
router.put('/edit', sanatizeUserType, UserEditValidation, auth.edit);
router.get('/me', sanatizeUserType, auth.profile);

// Linkedin in Social Login Access Token
router.route('/getLinkedinAccessToken').post(auth.getLinkedinAccessToken); 
router.route('/getLinkedinDetailsFetch').post(auth.getLinkedinDetailsFetch);
router.route('/getLinkedinDetailsFetch1').post(auth.getLinkedinDetailsFetch1);

router.get('/userLogs',auth.userLogs);
router.put('/userlogs/logout',auth.userlogout);




module.exports = router;
