import {
  createStudentClass,
  createStudentProgram,
  getStudentClasses,
  getStudentClassById,
  getStudentCourseById,
  updateStudentClass,
  deleteStudentClass,
  getCompletedStudentClasses,
  getCompletedStudents,
  getStApproveList,
  getCompletedFellowShips,
  updateStudentProgramClass,
  getExamsshedule,
  getProgramExamsshedule,
  updateCertificates,
  updateProgramCertificates
} from "../../services/studentClasses";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../../utils/catchAsync');
let sharedUserData = null;

export const createStudentClassController = async (req, res, next) => {
  try {
    sharedUserData = {
      newStudent: req.body,
      userData: req.user._id,
    };
    const newStudent = req.body;
    const userData= req.user._id;
    const createdStudent = await createStudentClass(newStudent,userData,null);
    res
      .status(201)
      .json({
        success: true,
        message: "student registered successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const webhookSave = catchAsync(async (req, res, next) => {
	const signature = req.headers['stripe-signature'];
	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET_KEY
		);
	} catch (err) {
		return res.status(400).send('webhook error', err.message);
	}

	if (event.type === 'checkout.session.completed') {
    const newStudent = sharedUserData.newStudent;
    const userData= sharedUserData.userData;
		createStudentClass(newStudent,userData,event);
		res.status(200).json({ recieved: true });
	} else res.status(200).json({ recieved: false });
});

export const getExamsdata = async (req, res, next) => {
  try {
   // const newStudent = req.body;
   // const userData= req.user._id;
    const createdStudent = await getExamsshedule(req.params.id,res);
    res
      .status(201)
      .json({
        success: true,
        message: "student registered successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const certificate = async (req, res, next) => {
  try {
    const createdStudent = await updateCertificates(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "student registered successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const programCertificate = async (req, res, next) => {
  try {
    const createdStudent = await updateProgramCertificates(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "certificate generated successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProgramExamsdata = async (req, res, next) => {
  try {
   // const newStudent = req.body;
   // const userData= req.user._id;
    const createdStudent = await getProgramExamsshedule(req.params.id,res);
    console.log("====",createdStudent)
    res
      .status(201)
      .json({
        success: true,
        message: "student registered successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createStudentProgramController = async (req, res, next) => {
  try {
    const newStudent = req.body;
    const userData= req.user._id;
    const userName=req.user.name;
    const createdStudent = await createStudentProgram(newStudent,userData,userName);
    res
      .status(201)
      .json({
        success: true,
        message: "Program Registered Successfully",
        data: createdStudent,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getStudentClassesController = async (req, res) => {
  try {
    const result = await getStudentClasses(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getStudentApproveList = async (req, res) => {
  try {
    const result = await getStApproveList(req.query);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getStudentClassByIdController = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentClass = await getStudentClassById(studentId);
    res.json(studentClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentCourseByIdController = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const studentClass = await getStudentCourseById(studentId,courseId);
    res.json(studentClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('err',error)
  }
};


export const updateStudentClassController = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;
    const userData= req.user._id;
    const updatedStudentClass = await updateStudentClass(studentId, updateData,userData);
    res
      .status(200)
      .json({
        success: true,
        message: "Student Classes updated successfully",
        data: updatedStudentClass,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateStudentApproveList = async (req, res) => {
  try {
    console.log('req.aa',req.params)
    console.log('req',req.body)
    const updateData = req.body;
    const userData= req.user._id;
    const classId=req.params.id;
    const updatedStudentClass = await updateStudentProgramClass(classId, updateData,userData);
    res
      .status(200)
      .json({
        success: true,
        message: "Student Program Classes updated successfully",
        data: updatedStudentClass,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudentClassController = async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudentClass = await deleteStudentClass(studentId);
    res
      .status(200)
      .json({
        success: true,
        message: "Student Classes deleted successfully",
        data: deletedStudentClass,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompletedStudentClassesByCourseId = async (req, res) => {
  try {
    const { course_id } = req.params;

    const completedStudentClasses = await getCompletedStudentClasses(course_id);

    if (completedStudentClasses.length === 0) {
      return res.status(404).json({ error: "No completed student classes found for the given course ID" });
    }

    return res.json(completedStudentClasses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCompletedStudentsController = async (req, res) => {
  try {
    const query = req.query;
    const students = await getCompletedStudents(query);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve completed students." });
  }
};
export const getCompletedFellowShip = async (req, res) => {
  try {
    const query = req.query;
    const students = await getCompletedFellowShips(query);

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve completed students." });
  }
};