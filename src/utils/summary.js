//? ===============================
//?  UTILITIES FOLDER -> link with middleware folder
//?  Contains reusable helper classes/functions
//? ===============================


//? -------------------------------
//?  1️⃣ CustomError.js
//? -------------------------------
//! Purpose: Custom error class to standardize error handling
//! Usage: throw new CustomError("Message", 400);
//! Key Benefit: Can add status codes + consistent error messages

/*
Example:

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
*/


//? -------------------------------
//?  2️⃣ jwt.util.js
//? -------------------------------
//! Purpose: JWT token generation and verification
//! Usage: generate JWT for login, verify JWT for protected routes
//! Key Benefit: Centralized JWT logic, keeps secret key management consistent

/*
Example:

import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
*/


//? -------------------------------
//?  3️⃣ asyncHandler.util.js
//? -------------------------------
//! Purpose: Wrap async route handlers to catch errors automatically
//! Usage: Avoid repetitive try/catch in every route
//! Key Benefit: Cleaner controllers, centralized error handling

/*
Example:

import asyncHandler from "express-async-handler";

const someController = asyncHandler(async (req, res, next) => {
  const data = await SomeModel.find();
  res.json(data);
});

export default asyncHandler;
*/


//? ===============================
//?  SUMMARY
//? -------------------------------
//! CustomError.js → Standardizes throwing errors with status codes
//! jwt.util.js → Handles JWT creation & verification
//! asyncHandler.util.js → Simplifies async controller error handling
//! Together → Make backend cleaner, secure, and maintainable
