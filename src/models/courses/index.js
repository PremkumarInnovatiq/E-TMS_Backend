import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import urlSlug from 'mongoose-url-slugs';
import { MongoSchemaAddOn } from '../../utilities/mongoCommonCollection';
import MainCategory from '../../models/main-category/index';
import SubCategory from '../../models/sub-category/index';
import AuditDetails from '../../models/audit/audit';


const NewCourses = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
    },
    course_duration_in_days: {
      type: Number,
      required: false,
    },
    training_hours: {
      type: Number,
    },
    skill_connect_code: {
      type: String,
    },
    fee: {
      type: Number,
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

    currency_code: {
      type: String,
    },
    main_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MainCategory,
    },
    sub_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SubCategory,
    },
    pdu_technical: {
      type: Number,
    },
    pdu_leadership: {
      type: Number,
    },
    pdu_strategic: {
      type: Number,
    },
    website_link: {
      type: String,
    },
    image_link: {
      type: String,
    },
    funding_grant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FundingGrant',
    },
    survey: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Survey',
    },
    certificates: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CertificateBuilder'
    },
    course_description: {
      type: String,
    },
    course_detailed_description: {
      type: String,
    },
    banner_image_link: {
      type: String,
    },
    master_instructor: {
      type: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    course_kit: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseKit',
    }],
    course_instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    exam: {
      type: String
    },
    collectionName: { type: String, default: 'courses' },
    modifiedBy: { type: String }
  },
  MongoSchemaAddOn
);
NewCourses.plugin(urlSlug('title'));
NewCourses.plugin(mongoosePaginate);
NewCourses.index({ title: 'text', courseCode: 'text' });




const handleCRUD = function (operation, collectionName, modifiedBy, auditData, next) {
  if (operation === '_new') {
    operation = 'Created';
  } else if (operation === 'updateCourseById') {
    console.log("upd")
    operation = 'Updated';
  }
  // Store audit details for the CRUD operation

  const audit = new AuditDetails({
    collectionName,
    operation,
    modifiedBy,
    auditData,
    type: "userAudit"
  });
  audit.save();
  next();
};
// Apply middleware to the "new_courses" collection
NewCourses.post('save', function (doc, next) {
  const auditData = {
    course: {
      title: doc.title
    }
  };
  handleCRUD.call(doc, '_new', doc.collectionName, doc.modifiedBy, auditData, next);
});
NewCourses.post('findOneAndUpdate', function (doc, next) {
  const auditData = {
    course: {
      title: doc.title
    }
  };
  handleCRUD.call(doc, 'updateCourseById', doc.collectionName, doc.modifiedBy, auditData, next);
});

module.exports = mongoose.model('new_courses', NewCourses);
