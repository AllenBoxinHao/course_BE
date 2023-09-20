const Course = require("../models/course.model");

const addCourse = async (req, res) => {
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
    res.sendStatus(204);
};

module.exports = {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
};
