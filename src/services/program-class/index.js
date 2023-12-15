import Class from '../../models/program-class/index'
import { getQueryParams } from '../../utilities/helpers';
import StudentClasses from '../../models/studentClasses';

exports.createProgramClass = {
    async createProgramClass(classData,userData) {
        try {
             classData.modifiedBy=userData
            return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
};


exports.getAllProgramClasses = async (query) => {
    let regex = new RegExp(query.programName, "i");
    if(query.programName){
        let where={
            "programName": { $regex: regex } 
     } 
     const params = getQueryParams(query, null, true);
     const paginatedResults = await Class.paginate(where, { page: params.page, limit: params.limit, sort: params.sortBy });
     const courses = await Class.populate(paginatedResults.docs, { path: 'courseId' });
     return {
         ...paginatedResults,
         docs: courses
     };
 
    } else {
        const params = getQueryParams(query, null, true);
        const paginatedResults = await Class.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
        const courses = await Class.populate(paginatedResults.docs, { path: 'courseId' });
        return {
            ...paginatedResults,
            docs: courses
        };
   
    }

};
export const getProgramClassById = (classId) => {
    return Class.findById(classId)
        .populate('courseId')
        .populate({
            path: 'sessions.instructorId',
                model: 'User',
                select: 'name last_name email',
        })
        .populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });
};

// export const getStudentClassDetails = async (classId) => {
//     const classObj = await Class.findById(classId)
//         .populate('courseId')
//         .populate({
//             path: 'sessions.instructorId',
//             populate: {
//                 path: 'user_id',
//                 model: 'User',
//                 select: 'name last_name email',
//             },
//         })
//         .populate({
//             path: 'sessions.laboratoryId',
//             model: 'Laboratory',
//         });

//     const students = await StudentClasses.find({ classId, status: { $nin: ['registered', 'cancel','withdraw'] }  })
//         .populate({path:'studentId',select: 'name last_name email',});

//     return {
//         classObj,
//         students
//     };
// };

export const updateProgramClass = async (classId, updateData) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(classId, updateData, {
            new: true,
            runValidators: true,
        });
        if (!updatedClass) {
            throw new Error('Class not found.');
        }
        return updatedClass;
    } catch (error) {
        throw new Error('Failed to update class.');
    }
};


export const deleteProgramClass = async (classId) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(classId);
        if (!deletedClass) {
            throw new Error('Class not found.');
        }
        return deletedClass;
    } catch (error) {
        throw new Error('Failed to delete class.');
    }
};

export const checkAvailableInstructor = async (instructorId, sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime) => {
    try {
        const classes = await Class.find({
            $and: [
                { "sessions.instructorId": instructorId },
                checkSessionAvailabilityQuery(sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime)
            ]
        }).populate('courseId', ['title', 'courseCode']).populate({
            path: 'sessions.instructorId',
            populate: {
                path: 'user_id',
                model: 'User',
                select: 'name last_name email',
            },
        }).populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });
        return classes;
    } catch (error) {
        throw new Error('Failed to check available instructor.');
    }
}

export const checkAvailableLaboratory = async (laboratoryId, sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime) => {
    try {
        const classes = await Class.find({
            $and: [
                { "sessions.laboratoryId": laboratoryId },
                checkSessionAvailabilityQuery(sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime)
            ]
        }).populate('courseId', ['title', 'courseCode']).populate({
            path: 'sessions.instructorId',
            populate: {
                path: 'user_id',
                model: 'User',
                select: 'name last_name email',
            },
        }).populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });
        return classes;
    } catch (error) {
        throw new Error('Failed to check available laboratory.');
    }
}

function checkSessionAvailabilityQuery(sessionStartDate, sessionStartTime, sessionEndDate, sessionEndTime) {
    return {
        $or: [{
            $and: [{
                $and: [
                    {
                        "sessions.sessionStartDate": {
                            $lte: new Date(sessionStartDate)
                        }
                    },
                    {
                        "sessions.sessionEndDate": {
                            $gte: new Date(sessionStartDate)
                        }
                    }
                ]
            },
            {
                $and: [
                    {
                        "sessions.sessionStartTime": {
                            $lte: sessionStartTime
                        }
                    },
                    {
                        "sessions.sessionEndTime": {
                            $gte: sessionStartTime
                        }
                    }
                ]
            }]
        },
        {
            $and: [{
                $and: [
                    {
                        "sessions.sessionStartDate": {
                            $lte: new Date(sessionEndDate)
                        }
                    },
                    {
                        "sessions.sessionEndDate": {
                            $gte: new Date(sessionEndDate)
                        }
                    }
                ]
            },
            {
                $and: [
                    {
                        "sessions.sessionStartTime": {
                            $lte: sessionEndTime
                        }
                    },
                    {
                        "sessions.sessionEndTime": {
                            $gte: sessionEndTime
                        }
                    }
                ]
            }]
        },
        ]
    }
}