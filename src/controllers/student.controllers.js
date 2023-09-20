const Student = require("../models/student.model");
const Course = require("../controllers/course.controllers");

const addStudent = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    // data validation
    const student = new Student({ firstName, lastName, email });
    // const student = new Student(req.body);
    // try {
    await student.save();
    res.json(student);
    // } catch(e) {

    // }
};
const getAllStudents = async (req, res) => {
    // db.students.find()
    // Query chain
    // Student.find().sort().limit().filter()
    // Student.find() -> Query
    // Query.sort() -> Query
    // builder pattern
    const students = await Student.find().exec();
    res.json(students);
};
const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id).exec();
    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }
    res.json(student);
};
const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const student = await Student.findByIdAndUpdate(
        id,
        {
            firstName,
            lastName,
            email,
        },
        { new: true }
    ).exec();
    // await Student.findOneAndUpdate({email}, {})
    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }
    res.json(student);
};
const deleteStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
    }
    res.sendStatus(204);
};
// POST /v1/students/:studentId/courses/:courseId
const addStudentToCourse = async (req, res) => {
    const { studentId, courseId } = req.params;

    // 通过id找student和course
    const student = await Student.findById(studentId).exec();
    const course = await Course.findById(courseId).exec();
    // 确保学生和课程确实存在
    if (!student || !course) {
        res.status(404).json({ error: "Student or course not found" });
        return;
    }
    // 把学生添加进课程
    course.students.addToSet(studentId);
    // 把课程添加进学生
    student.courses.addToSet(courseId);
    // 记得保存
    await student.save();
    await course.save();

    res.json(student);
};
// DELETE /v1/students/:studentId/courses/:courseId
const removeStudentFromCourse = async (req, res) => {
    const { studentId, courseId } = req.params;
    // 通过id找student和course
    const student = await Student.findById(studentId).exec();
    const course = await Course.findById(courseId).exec();
    // 确保学生和课程确实存在
    if (!student || !course) {
        res.status(404).json({ error: "Student or course not found" });
        return;
    }
    student.courses.pull(courseId);
    course.students.pull(studentId);

    await student.save();
    await course.save();

    res.sendStatus(204);
};

module.exports = {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    addStudentToCourse,
    removeStudentFromCourse,
};
