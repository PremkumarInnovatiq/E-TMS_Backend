import { getAllCourseProgram, getProgramById,createCourseProgram, updateCourseProgramById,programDeleteServices } from "../../services/courseProgramService"



export const getAllProgramCourse = async (req, res, next) => {
    try {
        const query = req.query;
        const courseProgram = await getAllCourseProgram.getAllCourseProgram(query)
        res.status(200).json({
            message: 'Programs fetched successfully',
            data: courseProgram,
        });
    } catch (error) {
        next(error);
    }
};
export const getProgramByIdController = async (req, res) => {
    try {
      const id  = req.params;
      const course = await getProgramById(req.params.id);
      res.status(200).json({            
        message: 'Program fetched successfully',
        data:course
    });
    } catch (err) {
        res.status(500).json({ error:err });
    }
  };


export const createCourseProgramController = async (req, res) => {
    const courseProgramData = req.body;
    if (!courseProgramData.status) {
        courseProgramData.status = "inactive";
      }
    try {
        const menuItem = await createCourseProgram(courseProgramData);
        res.status(200).json({ message: 'Program created successfully', menuItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const updateCourseProgramByIdController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const data = req.body;
        const courseProgram = await updateCourseProgramById(id, data);
        if (!courseProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Program updated successfully',
            data: courseProgram,
        });
    } catch (error) {
        next(error);
    }
};
export const deleteProgramById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCourse = await programDeleteServices.deleteProgramById(id);
      res.status(200).json({
        status: "success",
        message: "program deleted successfully",
        data: deletedCourse,
      });
    } catch (err) {
      next(err);
    }
  };
  