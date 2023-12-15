import Projects from '../models/Projects';
import { getQueryParams } from '../utilities/helpers';
import userProjectModel from '../models/userProjects';

exports.projectPostServices = {
	async saveRequest(requestData) {
		try {
			requestData['status'] = 1;

			requestData["projectPlan.projectDuration"]= requestData.projectDuration;
			requestData["projectPlan.week1Duration"]= requestData.week1Duration;
			requestData["projectPlan.week1DurationFile"]= requestData.week1DurationFile;
			requestData["projectPlan.week2Duration"]= requestData.week2Duration;
			requestData["projectPlan.week2DurationFile"]= requestData.week2DurationFile;
			requestData["projectPlan.week3Duration"]= requestData.week3Duration;
			requestData["projectPlan.week3DurationFile"]= requestData.week3DurationFile;
			requestData["projectPlan.week4Duration"]= requestData.week4Duration;
			requestData["projectPlan.week4DurationFile"]= requestData.week4DurationFile;
			requestData["projectPlan.week5Duration"]= requestData.week5Duration;
			requestData["projectPlan.week5DurationFile"]= requestData.week5DurationFile;
			requestData["projectPlan.week6Duration"]= requestData.week6Duration;
			requestData["projectPlan.week6DurationFile"]= requestData.week6DurationFile;
			requestData["projectPlan.monthDuration"]= requestData.monthDuration;
		
			return await Projects.create(requestData);
		} catch (e) {
			throw e;
		}
	},

	async updateProject(requestData, projectId) {
		try {
			if (projectId) {
				let projectResult = await Projects.findOne({_id: projectId});
				if(requestData.mentor != projectResult?.projectOwner?.id && projectResult.requestMentor != true)
				{
					requestData['acceptMentorInvitation'] = true;
					requestData['requestMentor'] = requestData.mentor;

					const projectlins = new userProjectModel({
						project_id: projectId,
						user_id: requestData.mentor,
						status: 1,
					});
					await projectlins.save();
				} 
				return await Projects.findOneAndUpdate({ _id: projectId }, requestData, {
					new: true,
				});
			} else {
				_throwException('project not found');
			}
		} catch (e) {
			throw e;
		}
	},


	async uploadFiles(requestData) {
		try {
			let payload = {};
			if (requestData.files) {
				const files = requestData.files;
				if (files?.week1DurationFile) {
					payload['week1DurationFile'] = files?.week1DurationFile[0]?.path;
				}
				if (files?.week2DurationFile) {
					payload['week2DurationFile'] = files?.week2DurationFile[0]?.path;
				}
				if (files?.week3DurationFile) {
					payload['week3DurationFile'] = files?.week3DurationFile[0]?.path;
				}
				if (files?.week4DurationFile) {
					payload['week4DurationFile'] = files?.week4DurationFile[0]?.path;
				}
				if (files?.week5DurationFile) {
					payload['week5DurationFile'] = files?.week5DurationFile[0]?.path;
				}
				if (files?.week6DurationFile) {
					payload['week6DurationFile'] = files?.week6DurationFile[0]?.path;
				}
			}
			return payload;
		} catch (e) {
			throw e;
		}
	},


	async deleteProject(projectId) {
		try {
			if (projectId) {
				await Projects.updateOne({ _id: projectId }, { status: 10 });
				return true;
			} else {
				_throwException('project not found');
			}
		} catch (e) {
			throw e;
		}
	},
};

exports.projectGetServices = {

	async getAll(query, status = null) {
		const params = getQueryParams(query, status);
		console.log("params===>", params)
		return await Projects.paginate(params.filter, { page: params.page, limit: params.limit, sort: { createdAt: -1 }, });
	},

	async getAllStudentProject(query, status = null) {
		const params = getQueryParams(query, status);
		return await Projects.paginate({ $or: [{ projectStatus: 'new' }, { projectStatus: 'reject' }], projectType: { $not: { $in: ["mentors"] } } }, { page: params.page, limit: params.limit, sort: params.sortBy });
	},

	async getMentorProjectWise(query, status = null) {
		const params = getQueryParams(query, status);
		// return await Projects.find({projectType: { $in: ["mentors"] },$or: [ { projectStatus: 'new' },{ projectStatus: 'reject' } ]}).sort({_id: -1 }); 
		return await Projects.paginate({ $or: [{ projectStatus: 'new' }, { projectStatus: 'reject' }], projectType: { $in: "mentors" } }, { page: params.page, limit: params.limit, sort: params.sortBy });

	},

	async getProjectsListing(query, status = null) {
		const params = getQueryParams(query, status);
		const selectQuery = 'sdg title description partner hash_tags';
		const populateQuery = [{ path: 'partner', select: '-_id name avatar' }, { path: 'mentor' }];
		return await Projects.paginate(params.filter, {
			page: params.page,
			limit: params.limit,
			select: selectQuery,
			populate: populateQuery,
		});
	},

	async getSignupWiseProjectsListing(
		query,
		signedUpProjects,
		watchlistProjects,
		completedProjects
	) {
		const params = getQueryParams(query, true);
		const selectQuery = 'sdg title description partner hash_tags';
		// const populateQuery =  [{ path: 'partner',select:'-_id name avatar' }];
		const populateQuery = [{ path: 'partner' }, { path: 'mentor' }];
		let projects = await Projects.paginate(params.filter, {
			page: params.page,
			limit: 50,
			populate: populateQuery,
		});
		let docs = projects.docs;
		let updatedDocs = docs.map(function (obj) {
			obj = obj.toJSON();
			obj.signedup = signedUpProjects.includes(obj.id);
			obj.watchlist = watchlistProjects.includes(obj.id);
			obj.completed = completedProjects.includes(obj.id);
			return obj;
		});
		projects.docs = updatedDocs;
		return projects;
	},

	async getOne(projectId) {
		return await Projects.findOne({ _id: projectId });
	},

	async getProjectDetails(projectId) {
		const populateQuery = [{ path: 'partner', select: '-_id name avatar' }, { path: 'mentor' }];
		return await Projects.findOne({ _id: projectId }).populate('partner', 'name avatar');
	},

	async getMentorProjectList(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }]
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectInProgress(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'ongoing'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectCompleted(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'completed'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectLive(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'pending'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getMentorProjectPending(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			$or: [{ projectOwner: mentorId }, { mentor: mentorId }],
			projectStatus: 'new'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getProjectsByMentorId(mentorId) {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			projectOwner: mentorId
		}).populate(populateQuery).sort({ "createdAt": -1 })
	},

	async getAllMentorProject() {
		const populateQuery = [{ path: 'mentor' }, { path: 'projectOwner' }];
		return await Projects.find({
			projectType: 'mentor'
		}).populate(populateQuery).sort({ "createdAt": -1 })
	}
};
