import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
const app = express();
dotenv.config();
//connecting db
mongoose
  .connect(process.env.MONGO_SECRET)
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log(e?.message);
  });

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server is running");
});
