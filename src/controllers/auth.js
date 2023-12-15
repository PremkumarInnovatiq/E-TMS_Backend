/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable eqeqeq */
let request = require("request");
import passport from 'passport';
import { redisClient } from '../middleware/redisClient';
import { userPostServices, userGetServices,getAllUserLogs,userLogout } from '../services/userServices';
import { getFields } from '../utilities/helpers';
import { emailType, sendEmail } from '../utilities/emailHelper';
import User from '../models/User';
import UserLogs from '../models/UserLogs';
import jwt from 'jsonwebtoken';
const params = require('../config/params.js');
const { getToken } = require('../utilities/helpers');
import AuditDetails from '../models/audit/audit';
import UserAuditDetails from '../models/audit/userAudit';
import { getUserType } from '../services/userType';



exports.signup = async function (req, res, next) {
	// console.log(req.body);
	passport.authenticate('register', (err, user, info) => {
		if (err) {
			return res.status(500).send({ status: 'error', message: err.message });
		}
		if (info != undefined) {
			return res.status(400).send({ status: 'error', message: info.message });
		}
		let user_data = user.user.toObject();
		if (user.user.type == 'student') {
			sendEmail(emailType.STUDENT_WELCOME_EMAIL, user.user);
			user_data.profile_completed = false;
		} else if (user.user.type == 'mentor') {
			sendEmail(emailType.STUDENT_WELCOME_EMAIL, user.user);
			user_data.profile_completed = false;
		}
		else if (user.user.type == 'counsellor') {
			sendEmail(emailType.COUNSELLOR_WELCOME_EMAIL, user.user);
		}
		return res.status(200).send({
			status: 'success',
			message: 'registration successful.',
			data: { user: user_data, token: user.token },
		});
	})(req, res, next);
};
exports.instructorCreate = async function (req, res, next) {

	try {
        if (req.file) {
			console.log("===req.file.originalname;========",req.file.originalname)
            //
			req.body.avatar = req.file.originalname;
        }
        const user = await userPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "users created successfully",
            data: user
        });
    } catch (e) {
        next(e)
    }
	
}
exports.instructorById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userData = await userPostServices.getinstructorById(id);
        if (!userData) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.status(200).json(userData);
    } catch (error) {
        next(error);
    }
};
exports.instructorUpdate = async (req, res, next) => {
    try {

        //const userData = req.user._id;
        const { id } = req.params;
             
        const instructor = await userPostServices.instructorByIdUpdate(id, req.body);
        if (!instructor) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Instructor updated successfully',
            data: instructor,
        });
    } catch (error) {
        next(error);
    }
};
exports.instructorConfrim = async (req, res, next) => {
    try {

        //const userData = req.user._id;
        const { id } = req.params;
             
        const instructor = await userPostServices.instructorconfirm(id, req.body);
		console.log(instructor)
		if(instructor){
			sendEmail(emailType.REGISTER_EMAIL,instructor);
		}
        if (!instructor) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Instructor updated successfully',
            data: instructor,
        });
    } catch (error) {
        next(error);
    }
};

exports.instructorDelete = async (req, res, next) => {
    try {

        //const userData = req.user._id;
        const { id } = req.params;
             
        const instructor = await userPostServices.instructorDelete(id);
        if (!instructor) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Instructor delete successfully',
            data: instructor,
        });
    } catch (error) {
        next(error);
    }
};









exports.instructorList = async function (req, res, next) {
	try {
		const query = req.query;
		const body = req.body;      
        const user = await userGetServices.getRequest(query,body)
        res.status(200).json({
            status: "success",
            message: "Users fetched successfully",
            data: user
        });
    } catch (e) {
        next(e)
    }
	
}
exports.userCreate = async function (req, res, next) {
	console.log("=============Tst")
	try {
        if (req.file) {
			console.log("===req.file.originalname;========",req.file.originalname)
            //
			req.body.avatar = req.file.originalname;
        }
		console.log("ssssssssss",req.body)
        const user = await userPostServices.saveRequest(req.body)
		
		
		if (user.type == 'Student') {
			sendEmail(emailType.STUDENT_WELCOME_EMAIL, user);
		}
        res.status(200).json({
            status: "success",
            message: "users created successfully",
            data: user
        });
    } catch (e) {
        next(e)
    }
	
}
exports.userLogs = async function(req,res, next){
	try {
        const query = req.query;

        const courseKits = await getAllUserLogs.getAllUserLogs(query)
        res.status(200).json({
            message: 'Course Kits fetched successfully',
            data: courseKits,
        });
    } catch (error) {
        next(error);
    }


}

	

exports.login = async function (req, res, next) {

	if (req.body.password) {
		// Authenticate using password-based login
		passport.authenticate('login', async (err, user, info) => {
			
			if (err) {
				return res.status(500).send({ status: 'error', message: err.message });
			}
			if (info != undefined) {
				return res.status(400).send({ status: 'error', message: info.message });
			}
			// const token = jwt.sign({ id: user._id, role: user.role, exp: Math.floor(Date.now() / 1000) + 300 }, params.secret);
			// setting cookie jwt TESTCODE
			res.cookie('jwt', user.token, {
				expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
				httpOnly: true,
				secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
			});


			// Remove password from output
			user.user.password = undefined;
			
			if (user.user.Active === true) {
				let menuItems;
				try {
					const userType = await getUserType(user.user.type);
					if (userType?.menuItems) {
						menuItems = userType.menuItems;
					}
					if (req?.body?.logintype === 'admin') {
						if (!userType.isAdmin)
							return res.status(403).send({ status: 'error', message: 'Not enough privileges to access' });
					}
				} catch (error) {
					console.log("======error", error)
					next(error);
					res.status(400).json({
						status: 'error',
						message: 'User Type Not Found',
					});
				}
				console.log(user.user)
				let userObject={
					email:user.user.email,
					name:user.user.name,
					last_name:user.user.last_name,
					type:user.user.type
				}
				// let resultawait = await UserLogs.find({email:user.user.email})
				// if(resultawait.length >0){
				// 	let result1=await UserLogs.findOneAndUpdate({email:user.user.email},{loginTime:new Date()})


				// } else {
					let result1=await UserLogs.create(userObject)

				//}
				
				
				if (user.user.type == 'student') {

					// Save audit details for the login activity
					const activity = 'logged in';
					const modifiedBy = user.user._id;
					
					const type = 'loginActivity'
					const audit = new AuditDetails({
						activity,
						type,
						modifiedBy
					});
					await audit.save();
				}
				
				user.user.menuItems = menuItems
				return res.status(200).send({
					status: 'success',
					message: `logged in successfully.`,
					data: user,
					userLogs:result1
				});
			} else {
				return res.status(400).send({
					status: 'error',
					message: `Your account has been disabled. Please contact support.`
				});
			}

		})(req, res, next);
	} else if (req.body.otp) {
		const { email, otp } = req.body;
		redisClient.get(`${email}`, async (err, storedOtp) => {
			try {
				if (err) {
					console.log('Error in retrieving OTP:', err);
					return res.status(500).send({ status: 'error', message: 'Internal server error' });
				}
				if (storedOtp !== otp || otp.length > 6) {
					console.log('Invalid OTP entered');
					return res.status(400).send({ status: 'error', message: "Invalid OTP. Please enter a 6-digit OTP." });
				}
				if (!storedOtp) {
					console.log('OTP has expired or was never sent for this email:', email);
					return res.status(400).send({ status: 'error', message: 'Invalid OTP or OTP has expired' });
				}
				if (storedOtp !== otp) {
					console.log('OTP entered does not match the stored OTP');
					return res.status(400).send({ status: 'error', message: 'Invalid OTP' });
				}

				redisClient.del(`${email}`);
				const user = await User.findOne({ email: email });

				if (!user) {
					return res.status(400).send({ status: 'error', message: 'Invalid email address' });
				}

				const token = jwt.sign({ id: user._id, role: user.role }, params.secret, {
					expiresIn: '90d',
				});

				res.cookie('jwt', token, {
					expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
					httpOnly: true,
					secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
				});

				user.password = undefined;

				if (user.Active === true) {
					return res.status(200).send({
						status: 'success',
						message: `logged in successfully.`,
						data: { user, token },
					});
				} else {
					return res.status(400).send({
						status: 'error',
						message: `Your account has been disabled. Please contact support.`
					});
				}
			} catch (err) {
				console.error('Error occurred:', err);
				return res.status(500).send({ status: 'error', message: 'Internal server error' });
			}
		});

	}

};

exports.getLinkedinAccessToken = async function (req, res, next) {
	//console.log("=====",req.query.code)
	let postData = req.body;
	console.log("postData", postData);
	try {
		const body = {
			grant_type: 'authorization_code',
			code: postData.code,
			redirect_uri: postData.redirect_uri,
			client_id: postData.client_id,
			client_secret: postData.client_secret
		};

		new Promise((resolve, reject) => {
			request.post({ url: 'https://www.linkedin.com/oauth/v2/accessToken', form: body }, (err, response, body) => {
				var accesstoken = "";
				if (err) {
					console.log("======err", err)

					reject(err);
				}
				else {
					console.log("response.statusCode555", response.statusCode);
					console.log("response.", response);
					console.log("response.", response.body);
					if (response.statusCode == 200) {
						console.log("===========", response.body)
						var result = JSON.parse(response.body);
						accesstoken = result.access_token;
						return res.status(200).json({
							status: 'Success',
							message: 'Access token genrate',
							token: accesstoken,
						});
					}
				}
				resolve(accesstoken);
			}
			);
		});
	}
	catch (error) {
		console.log("======error", error)
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'token genrate faild',
		});
	}

};

exports.getLinkedinDetailsFetch = async function (req, res, next) {
	let postData = req.body;
	try {
		return new Promise((resolve, reject) => {
			let options = {
				method: "GET",
				url: "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
				headers: {
					"content-type": "application/json",
					charset: "UTF-8",
					"cache-control": "no-cache",
					Authorization: "Bearer " + postData.accessToken,
				},
				json: true,
			};
			request(options, function (err, response) {
				if (err) {
					console.log(err);
					return reject({
						code: 400,
						message: "fetch details faild",
						data: err,
					});
				} else {
					let resultData = response.body;
					return res.status(200).json({
						status: 'Success',
						message: 'fetch details successfully',
						result: resultData,
					});
				}
			});
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'fetch details faild',
		});
	}
};

exports.getLinkedinDetailsFetch1 = async function (req, res, next) {
	let postData = req.body;
	try {
		return new Promise((resolve, reject) => {
			let options = {
				method: "GET",
				url: "https://api.linkedin.com/v2/me",
				headers: {
					"content-type": "application/json",
					charset: "UTF-8",
					"cache-control": "no-cache",
					Authorization: "Bearer " + postData.accessToken,
				},
				json: true,
			};
			request(options, function (err, response) {
				if (err) {
					console.log(err);
					return reject({
						code: 400,
						message: "fetch details faild",
						data: err,
					});
				} else {
					let resultData = response.body;
					return res.status(200).json({
						status: 'Success',
						message: 'fetch details successfully',
						result: resultData,
					});
				}
			});
		});
	}
	catch (error) {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'fetch details faild',
		});
	}
};

exports.socialLogin = async function (req, res, next) {
	passport.authenticate('socialLogin', (err, user, info) => {
		if (err) {
			return res.status(500).send({ status: 'error', message: err.message });
		}
		if (info != undefined) {
			return res
				.status(200)
				.send({ status: 'success', message: info.message, info_required: true });
		}
		return res.status(200).send({
			status: 'success',
			message: 'loggedin successful.',
			data: user,
		});
	})(req, res, next);
};

exports.profile = async function (req, res, next) {
	try {
		// let user = await userGetServices.getOne(
		// req.user._id,
		// getFields(req.user.type, req.user.user_type).basic
		// );
		// let user_data = user.toObject();
		// user_data.profile_completed = false;
		// if (req.user.type == 'student') {
		// 	const student_profile = await userGetServices.getProfileCompletionById(req.user._id);
		// 	if (student_profile && student_profile.profile_completion) {
		// 		user_data.profile_completed = student_profile.profile_completion.profile_completed;
		// 	}
		// }
		var populateQuery = [
			{ path: 'countryObj', select: '-_id -id name' },
			{ path: 'stateObj', select: '-_id -id name' },
			{ path: 'cityObj', select: '-_id -id name' },
		];

		let selectDoc = '';
		selectDoc = getFields(req.user.type, req.user.user_type).basic;
		User.findOne({ _id: req.user._id })
			.select(selectDoc).then(user => {
				return res.status(200).json({
					status: 'success',
					message: 'user details',
					data: user,
				});
			})
		// let user = User.findOne(req.user._id);
		// console.log(user)

	} catch (error) {
		next(error);
	}

};

exports.logout = async function (req, res, next) {
	const userData = req.user._id;
	const token = getToken(req);
	redisClient.LPUSH('token', token, function (err, reply) {
		if (err) {
			return res
				.status(500)
				.send({ status: 'error', message: 'some problem occur. Please try again.' });
		}

		console.log("user.user.type", req.user)
		// Save audit details for the login activity
		const activity = 'logged out';
		const modifiedBy = userData;
		const type = 'loginActivity'
		const audit = new AuditDetails({
			activity,
			modifiedBy,
			type
		});
		audit.save();

		return res.status(200).send({
			status: 'success',
			message: 'logged out successfully.',
		});
	});
};
exports.userlogout = async function (req, res, next) {
	try {
        const query = req.body;
		console.log("sssssssssssss",req.body)

        const courseKits = await userLogout.userLogout(query)
        res.status(200).json({
            message: 'userLogs fetched successfully',
            data: courseKits,
        });
    } catch (error) {
        next(error);
    }

	
};

exports.edit = async function (req, res, next) {
	try {
		const userId = req.user.id;
		const user = await userPostServices.updateUser(
			req.body,
			userId,
			getFields(req.user.type, req.user.user_type).basic
		);
		if (user) {
			return res.status(200).json({
				status: 'success',
				message: 'user updated successfully',
				data: user,
			});
		}
	} catch (e) {
		next(e);
	}
};
