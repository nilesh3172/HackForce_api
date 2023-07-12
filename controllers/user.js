import User from "../models/User.js";





export const getUser = async (req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

export const getStudent = async(req, res)=>{
  try{
    await User.findOne({"username" : req.params.username})
    .then((result)=>{
       return res.status(200).json(result);
    })

  }
  catch(err){
    res.status(400).json(err);
  }
}

export const getStudents = async (req, res) => {

  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUser = async (req, res) => {
  console.log("svkmmkm");
  const userData = req.body;
  try {
      const result = await User.findOneAndUpdate({"username": userData['username']}, userData);
      return await res.send(result == null ? "Invalid User":userData);
  } catch (err) {
      res.status(500).json(err);

  }
}


export const deleteUser = async (req,res)=>{
  console.log("delete user");
  try {
    await User.findOneAndDelete({"username": req.params.username});
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(400).json(err);
  }
}



export const getStudentCount = async (req, res) => {
  try {
      const studentsCount = await User.countDocuments({ isAdmin: false });
      res.status(200).json({ count: studentsCount });
  } catch (err) {
      res.status(500).json(err);
  }
}
