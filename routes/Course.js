import express from "express";
import { addCourse, createCourse, deleteCourse, getCourse, getCourses,getCourseCount, removeCourse, updateCourse } from "../controllers/Course.js";
import { verifyUser} from "../utils/verifyToken.js";

const router = express.Router();
router.get("/getCoursecount", getCourseCount)
// create
router.post("/create",  createCourse)
router.post("/addcourse",  addCourse)

//read
router.get("/getcourse/:course_code", getCourse)
router.get("/getcourses", getCourses)


//update
router.put("/update",  updateCourse)
//delete
router.delete("/delete/:course_code",  deleteCourse)
router.post("/removecourse",  removeCourse)


export default router