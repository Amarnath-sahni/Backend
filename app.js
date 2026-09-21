// import express from "express";
// import dotenv from "dotenv";


// const app = express();

// app.use(express.json()); //handle json data
// app.use(express.urlencoded({extended: true})); //handle form data

// export default app;

//? ===============================
//?  APP CONFIGURATION
//? ===============================

import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";

import {errorMiddleware} from "./src/middleware/error.middleware.js";
import userRoutes from "./src/routes/user/user.route.js";
import addressRoute from "./src/routes/user/address.route.js";
import blogRouter from "./src/routes/blog/blog.router.js"

//! Load environment variables
dotenv.config({quiet:true}); //.config({path"../controller....});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ allow frontend
    credentials: true, // ✅ allow cookies
  })
);

app.use(cookieParser());
//? Middleware to parse JSON body
app.use(express.json());

//? Middleware to parse form-data (URL encoded)
app.use(express.urlencoded({ extended: true }));

app.use("/api/user",userRoutes)
app.use("/api", addressRoute);

app.use("/api/blogs", blogRouter);

export default app;
