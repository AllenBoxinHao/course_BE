const { Router } = require("express");
const {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
} = require("../controllers/course.controllers");
const courseRouter = Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.post("/", addCourse);
courseRouter.patch("/:id", updateCourseById);
courseRouter.delete("/:id", deleteCourseById);

module.exports = courseRouter;
