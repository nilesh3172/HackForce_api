import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";

import courseRoute from "./routes/Course.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const port = process.env.PORT || 8800

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected",()=>{
  console.log("mongoDB Disconnected")
})
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

app.use("/api/course", courseRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log("Connected to backend.");
});
