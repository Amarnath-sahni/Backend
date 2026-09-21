//? npm i express mongoose dotenv express-async-handler joi
//? multer bcrypt.js cloudinary cors morgan jsonwebtoken cookie-parser nodemailer twilio


//? ===============================
//?  PACKAGE INSTALLATION REFERENCE
//? ===============================

//! Backend Framework
//? express → Used to create server, routes, middleware
import express from "express";

//! MongoDB ODM
//? mongoose → Helps define schemas, models, validations
import mongoose from "mongoose";

//! Environment Variables
//? dotenv → Loads variables from .env file
import dotenv from "dotenv";

//! Async Error Handler
//? express-async-handler → Wrap async routes & avoid try/catch everywhere
import asyncHandler from "express-async-handler";

//! Request Validation
//? joi → Validates req.body, req.query, req.params (Best validation library)
import Joi from "joi";

//! File Upload Middleware
//? multer → Upload images/files locally and send to Cloudinary
import multer from "multer";

//! Password Hashing
//? bcryptjs → Hash passwords before saving + compare passwords during login
import bcrypt from "bcryptjs";

//! Cloud Image Hosting
//? cloudinary → Upload, optimize, and manage media files
import { v2 as cloudinary } from "cloudinary";

//! CORS
//? cors → Connects backend to frontend (React/Next.js)
import cors from "cors";

//! HTTP Logger
//? morgan → Logs every request (GET/POST/etc) for debugging
import morgan from "morgan";

//! Authentication
//? jsonwebtoken → Generates and verifies JWT tokens for login sessions
import jwt from "jsonwebtoken";

//! Cookie Parser
//? cookie-parser → Read/write cookies (often used in JWT auth)
import cookieParser from "cookie-parser";

//! Email Service
//? nodemailer → Sends emails (OTP, verification, password reset)
import nodemailer from "nodemailer";

//! SMS/WhatsApp Service
//? twilio → Sends OTP via SMS or WhatsApp
import twilio from "twilio";
