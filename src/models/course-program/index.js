import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import NewCourses from '../../models/courses/index'




const CourseProgramSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String
        },
        deliveryMode: {
            type: String
        },
        shortDescription: {
            type: String,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        coreCourseCount: {
            type: Number,
            // required: true,
        },
        electiveCourseCount: {
            type: Number,
            // required: true,
        },
        image_link: {
            type: String,
          },      
        sessionStartDate: {
            type: Date,
        },
        sessionEndDate: {
            type: Date,
        },
        sessionStartTime: {
            type: String,
        },
        sessionEndTime: {
            type: String
        },
        duration: {
            type: String,
        },
        courseFee: {
            type: String
        },
        currency:{
            type:String
        },
        learningOutcomes: {
            type: String
        },
        attendees: {
            type: String
        },
        prerequisites: {
            type: String
        },
        programKit: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProgramCourseKit',
          }],

        coreprogramCourse: [
            {
                coreProgramId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "new_courses",
                },
                coreProgramName: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "new_courses",
                                  required: true,
                },
            
            
                coreProgramCode: {
                    type: String
                },
                coreProgramDescription: {
                    type: String
                },
                courseType: {
                    type: String,
                    enum: ['core', 'elective'],
                }
            }
        ],
        electiveprogramCourse: [
            {
                electiveProgramId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: NewCourses,                },
                electiveProgramName: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "new_courses",
                },
                electiveProgramCode: {
                    type: String
                },
                electiveProgramDescription: {
                    type: String
                },
                courseType: {
                    type: String,
                    enum: ['core', 'elective'],
                }
            }
        ]

    },
    MongoSchemaAddOn
);
CourseProgramSchema.plugin(mongoosePaginate);

const CourseProgram = mongoose.model("courseProgram", CourseProgramSchema);

export default CourseProgram;