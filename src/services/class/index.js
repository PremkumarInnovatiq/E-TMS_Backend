import Class from '../../models/class/index'
import ProgramClasses from '../../models/program-class/index'

import { getQueryParams } from '../../utilities/helpers';
import StudentClasses from '../../models/studentClasses';

exports.createClass = {
    async createClass(classData,userData) {
        try {
             classData.modifiedBy=userData
            return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
};
exports.updateSession =async(req,userData)=> {
    console.log("==test=",userData)
        try {
            return await Class.update({"_id" : userData.classId, "sessions._id" : userData._id},{$set : {"sessions.$.status" : userData
        .status}})
            //  classData.modifiedBy=userData
            // return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
    exports.updateProgramSession =async(req,userData)=> {
        console.log("===",userData)
        try {
            return await ProgramClasses.update({"_id" : userData.classId, "sessions._id" : userData._id},{$set : {"sessions.$.status" : userData
        .status}})
            //  classData.modifiedBy=userData
            // return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
    exports.getSession =async(req,query)=> {
        console.log()
        let filterValue = req.query.filterName;
        let where={"sessions.user_id":  req.params.id }
        console.log("filterValue",filterValue)
        if (!filterValue) {
            where={"sessions.user_id":  req.params.id }
          
            // The filtername is empty or undefined
            console.log('filtername is empty or undefined');
           
        
        // where["$or"] = [
        //     {"sessions.courseName": regex, "sessions.courseCode": regex },
        // ]; 
      
          } else {
            let regex = new RegExp(filterValue, "i");
            where={
                "sessions.user_id":  req.params.id ,
                $or: [
                    { "sessions.courseName": { $regex: regex } },
                    { "sessions.courseCode": { $regex: regex } },
                  ],
        
              } 
            // The filtername has a value
            console.log('filtername is not empty');
          }
         
        //const query1 = { "sessions.user_id":  req.params.id };
    //     if(filterValue != '' || filterValue != null)
    
    // { 
    //     console.log("=====test=====")
         
		
    //     // where["$or"] = [
    //     //     {"sessions.courseCode": regex },
    //     // ]; 
	// 	//where["sessions.courseCode"] = regex1;
        
    // }
    
        try {
           // return await Class.find({"sessions.user_id" : userData.id})
            const params = getQueryParams(query, null, true);
            console.log("where",where)
            //const query1 = { "sessions.user_id":  req.params.id };
            const clasess = await Class.paginate(where, {
                page: params.page,
                limit: params.limit,
                sort: params.sortBy,
            })
            console.log("========",clasess)
            return {
                docs: clasess,
                //...paginatedResults,
                // clasess,
                //sessions:sessions
            };
            //  classData.modifiedBy=userData
            // return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
    exports.getProgramSession =async(req,query)=> {
        console.log()
        let filterValue = req.query.filterName;
        let where={"sessions.user_id":  req.params.id }
        console.log("filterValue",filterValue)
        if (!filterValue) {
            where={"sessions.user_id":  req.params.id }
          
            // The filtername is empty or undefined
            console.log('filtername is empty or undefined');
           
        
        // where["$or"] = [
        //     {"sessions.courseName": regex, "sessions.courseCode": regex },
        // ]; 
      
          } else {
            let regex = new RegExp(filterValue, "i");
            where={
                "sessions.user_id":  req.params.id ,
                $or: [
                    { "sessions.courseName": { $regex: regex } },
                    { "sessions.courseCode": { $regex: regex } },
                  ],
        
              } 
            // The filtername has a value
            console.log('filtername is not empty');
          }
         
        //const query1 = { "sessions.user_id":  req.params.id };
    //     if(filterValue != '' || filterValue != null)
    
    // { 
    //     console.log("=====test=====")
         
		
    //     // where["$or"] = [
    //     //     {"sessions.courseCode": regex },
    //     // ]; 
	// 	//where["sessions.courseCode"] = regex1;
        
    // }
    
        try {
           // return await Class.find({"sessions.user_id" : userData.id})
            const params = getQueryParams(query, null, true);
            console.log("where",where)
            //const query1 = { "sessions.user_id":  req.params.id };
            const clasess = await ProgramClasses.paginate(where, {
                page: params.page,
                limit: params.limit,
                sort: params.sortBy,
            })
            console.log("========",clasess)
            return {
                docs: clasess,
                //...paginatedResults,
                // clasess,
                //sessions:sessions
            };
            //  classData.modifiedBy=userData
            // return await Class.create(classData);

        } catch (error) {
            console.log(error)
            throw new Error('Failed to create class.');
        }
    }
//sessionUpdate

exports.getAllClasses = async (req,query) => {
    let regex = new RegExp(query.courseName, "i");
    if(req.query.courseName){
        let where={
            "courseName": { $regex: regex } 
     } 
     const params = getQueryParams(query, null, true);
     const paginatedResults = await Class.paginate(where, { page: params.page, limit: params.limit, sort: params.sortBy });
     const courses = await Class.populate(paginatedResults.docs, { path: 'courseId' });
     let datasource=[]
     if(courses){
       courses&&courses?.forEach((item,index) => {       
         if (item.sessions[0]&&item.sessions[0].instructorId==="64ddde995571ce153cedf0d5") {
           datasource.push({
             sessionStartDate: moment(item.sessions[0].start).format("YYYY-MM-DD"),
             sessionEndDate: moment(item.sessions[0].end).format("YYYY-MM-DD"),
             sessionStartTime: moment(item.sessions[0].start).format("HH:mm"),
             sessionEndTime: moment(item.sessions[0].end).format("HH:mm"),
             laboratoryId: item.sessions[0].laboratoryId,
             courseName:item.sessions[0].courseName
           });
         } else {
         }
     
 
       });
     }
    let sessions = await Class.find({
         "sessions.user_id": req.user._id,
         
       })
     return {
         ...paginatedResults,
         docs: courses,
         sessions:sessions
     };
 

    } else {
        const params = getQueryParams(query, null, true);
        const paginatedResults = await Class.paginate(params.filter, { page: params.page, limit: params.limit, sort: params.sortBy });
        const courses = await Class.populate(paginatedResults.docs, { path: 'courseId' });
        let datasource=[]
        if(courses){
          courses&&courses?.forEach((item,index) => {       
            if (item.sessions[0]&&item.sessions[0].instructorId==="64ddde995571ce153cedf0d5") {
              datasource.push({
                sessionStartDate: moment(item.sessions[0].start).format("YYYY-MM-DD"),
                sessionEndDate: moment(item.sessions[0].end).format("YYYY-MM-DD"),
                sessionStartTime: moment(item.sessions[0].start).format("HH:mm"),
                sessionEndTime: moment(item.sessions[0].end).format("HH:mm"),
                laboratoryId: item.sessions[0].laboratoryId,
                courseName:item.sessions[0].courseName
              });
            } else {
            }
        
    
          });
        }
       let sessions = await Class.find({
            "sessions.user_id": req.user._id,
            
          })
        return {
            ...paginatedResults,
            docs: courses,
            sessions:sessions
        };
    
    }


};
export const getClassById = (classId) => {
    return Class.findById(classId)
        .populate('courseId')
        .populate({
            path: 'sessions.instructorId',
            populate: {
                path: 'user_id',
                model: 'User',
                select: 'name last_name email',
            },
        })
        .populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });
};
export const getClassByCourseId = (classId) => {
    return Class.find({courseId:classId})
        .populate('courseId')
        .populate({
            path: 'sessions.instructorId',
            populate: {
                path: 'user_id',
                model: 'User',
                select: 'name last_name email',
            },
        })
        .populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });
};


export const getStudentClassDetails = async (classId) => {
    const classObj = await Class.findById(classId)
        .populate('courseId')
        .populate({
            path: 'sessions.instructorId',
            populate: {
                path: 'user_id',
                model: 'User',
                select: 'name last_name email',
            },
        })
        .populate({
            path: 'sessions.laboratoryId',
            model: 'Laboratory',
        });

    const students = await StudentClasses.find({ classId, status: { $nin: ['registered', 'cancel','withdraw'] }  })
        .populate({path:'studentId',select: 'name last_name email',});

    return {
        classObj,
        students
    };
};

export const updateClass = async (classId, updateData) => {
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


export const deleteClass = async (classId) => {
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