import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { MongoSchemaAddOn } from '../utilities/mongoCommonCollection';


const surveySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'new_courses',
        required: true,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    coursePurpose: {
        type: String,
        enum: ['Mandatory Course', 'Elective', 'Others'],
    },
    courseAttendance: {
        type: String,
        enum: ['<40%', '40-59%', '60-79%', '80-100%'],
    },
    expectedGrade: {
        type: String,
        enum: ['<50%', '50-59%', '60-69%', '70-79%', '80-89%', '90-100%'],
    },
    rating: {
        overallRatingCourse: {
            type: Number,
            min: 0,
            max: 5,
        },
        overallRatingInstructor: {
            type: Number,
            min: 0,
            max: 5,
        },
        likelihoodToRecommend: {
            type: Number,
            min: 0,
            max: 10,
        },
    },
    agreementLevelForCourse: {
        courseObjectiveClear: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        courseTextbookClear: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        assignmentsHelpful: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        courseIncreasedInterest: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        courseMetExpectations: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
    },
    agreementLevelInstructor: {
        instructorKnowledgeable: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        instructorPreparedContent: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        instructorEncouragedFeedback: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
        instructorEnthusiastic: {
            type: String,
            enum: ['Strongly Disagree', 'Disagree', 'Agree', 'Strongly Agree'],
        },
    },
    feedback: {
        type: String,
    },
}, MongoSchemaAddOn);

surveySchema.plugin(mongoosePaginate)

const Survey = mongoose.model('Survey', surveySchema);

export default Survey;
