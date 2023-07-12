import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    "name": {
        type : String,
        required : true
    },
    "course_code": {
        type : String,
        required : true,
        unique: true
    },
    "faculty": {
        type : String,
        required : true
    },
    "url": {
        type : String,
        required : false
    }
});


export default mongoose.model("Course", CourseSchema);
