import express from "express";
import {
  
  getUser,
  updateUser,
  getStudents,
  getStudentCount,
  getStudent,
  deleteUser,
} from "../controllers/user.js";


const router = express.Router();


// Get students
router.get("/getstudents", getStudents)
router.get("/getstudent/:username", getStudent)
//update
router.put("/update", updateUser)
//Get student count
router.get("/getStudentCount", getStudentCount)


router.delete("/delete/:username", deleteUser)

//GET
router.get("/:id",  getUser)





export default router;
