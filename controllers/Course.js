import CourseModel from "../models/Course.js";
import UserModel from "../models/User.js";

export const createCourse = async (req, res) => {
    const subjectData = req.body;
    console.log("I was called for creating course");
    return await CourseModel.findOne({ course_code: subjectData["course_code"] })
        .then(async (result) => {
            if (result == null) {
                const obj = new CourseModel(subjectData);
                await obj.save();
                return await res.send(subjectData);
            }
            return res.send("Course Already Exists");
        })
        .catch((err) => {
           res.status(400).json(err);
        });
}

// Syntax
export const getCourse = async (req, res) => {
    try {
        await CourseModel.findOne({"course_code": req.params.course_code})
        .then((course)=>{
            console.log(req.params.course_code);
            if(course == null) return res.status(200).json("Invalid Course");
            return res.status(200).json(course);
        })
        .catch(err=>{console.log(err);})
        console.log(req.params.course_code);

    } catch (err) {
       res.status(400).json(err);
    }
}


export const getCourses = async (req, res) => {

    try {
        const users = await CourseModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

export const getCourseCount = async (req, res) => {
    try {
        const courseCount = await CourseModel.countDocuments();
        res.status(200).json({ count: courseCount });
    } catch (err) {
       res.status(400).json(err);
    }
}


export const updateCourse = async (req, res) => {
    const subjectData = req.body;
    return await CourseModel.findOneAndUpdate({ course_code: subjectData['course_code'] }, subjectData)
        .then(async (result) => {
            return await res.send(result == null ? "Invalid Course" : subjectData);
        })
        .catch((err) => {
           res.status(400).json(err);
        });
}

// Add Course for student
export const addCourse = async (req, res) =>{
    UserModel.findOne({"username":req.body['username']})
    .then(async (user)=>{
        CourseModel.findOne({"course_code": req.body['course_code']})
        .then(async (course)=>{
            if(course == null) return res.send("Invalid Course Selected");
            if(user.courses.find(obj => obj.course_code === course.course_code) != undefined){
                console.log(req.body);
                return await res.send("Already Enrolled");
            }
            user.courses.push(course);
            await user.save();
            return await res.send("Course added sucessfully");
        })
    })
    .catch((err) => {
       res.status(400).json(err);
    });
    
}

// Remove Course for student
export const removeCourse = async (req, res) =>{
    UserModel.findOne({"username":req.body['username']})
    .then(async (user)=>{
        CourseModel.findOne({"course_code": req.body['course_code']})
        .then(async (course)=>{
            if(course == null) return res.send("Invalid Course Selected");
            user.courses = user.courses.filter(ele => ele.course_code !== course.course_code);
            await user.save();
            return await res.send("Course Removed sucessfully");
        })
    })
    .catch((err) => {
       res.status(400).json(err);
    });
}

export const deleteCourse = async (req, res) => {
    const subjectData = req.params.course_code;
    console.log(subjectData);
    return await CourseModel.findOneAndDelete({ course_code: subjectData })
        .then(async (result) => {
            return await res.send(result == null ? "Invalid Course" : "Courses Deleted Sucessfully");
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}

