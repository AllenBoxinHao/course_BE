const Course = require("../models/course.model");
const Student = require("../models/student.model");
const Joi = require("joi");

const addCourse = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        code: Joi.string()
            .uppercase()
            .regex(/^[a-zA-z]+[0-9]+$/)
            .message("Invalid code format, expecting Faculty code + number")
            .required(),
    });
    await schema.validateAsync(req.body, {
        allowUnknown: true,
        stripUnknown: true,
    });
    const { code, name, description } = req.body;
    // data validation
    const course = new Course({ code, name, description });
    // const course = new course(req.body);
    // try {
    await course.save();
    res.json(course);
    // } catch(e) {

    // }
};
const getAllCourses = async (req, res) => {
    // db.courses.find()
    // Query chain
    // course.find().sort().limit().filter()
    // course.find() -> Query
    // Query.sort() -> Query
    // builder pattern
    const courses = await Course.find().exec();
    res.json(courses);
};
const getCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id).exec();
    if (!course) {
        res.status(404).json({ error: "course not found" });
        return;
    }
    res.json(course);
};
const updateCourseById = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const course = await Course.findByIdAndUpdate(
        id,
        {
            name,
            description,
        },
        { new: true, runValidators: true }
    ).exec();
    // await course.findOneAndUpdate({email}, {})
    if (!course) {
        res.status(404).json({ error: "course not found" });
        return;
    }
    res.json(course);
};
const deleteCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id).exec();
    if (!course) {
        res.status(404).json({ error: "course not found" });
        return;
    }
    await Student.updateMany({ courses: id }, { $pull: { courses: id } });
    res.sendStatus(204);
};

module.exports = {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};
