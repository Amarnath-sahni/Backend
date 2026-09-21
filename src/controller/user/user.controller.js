import expressAsyncHandler from "express-async-handler";
import userModel from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.js";
import { generateToken } from "../../utils/jwt.util.js";
import mailTransport from "../../config/nodemailer.config.js"; // ✅ ADD THIS
import crypto from "crypto";


// ✅ REGISTER
export const register = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log("🚀 REGISTER FUNCTION STARTED");

    const { name, email, password, phone } = req.body;
    console.log("📥 Incoming Register Request:", req.body);

    // 🔍 Check existing user
    console.log("🔍 Checking if user exists...");
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log("❌ User already exists:", email);
      return next(new CustomError("Email already registered", 400));
    }

    // ✅ Create user
    console.log("🛠 Creating user...");
    const newUser = await userModel.create({
      name,
      email,
      password,
      phone,
    });
    console.log("Phone Number", phone);
    console.log("✅ User Created:", newUser.email);

    // 🔑 Token
    console.log("🔑 Generating verification token...");
    const token = newUser.generateEmailVerificationToken();
    await newUser.save();

    console.log("🔑 Token Generated:", token);

    const verifyLink = `http://localhost:9000/api/user/verify-email?token=${token}`;
    console.log("🔗 Verify Link:", verifyLink);

    // 📧 Send Email
    console.log("📧 Sending email...");
    const info = await mailTransport.sendMail({
      from: `"AI Health" <${process.env.NODEMAILER_EMAIL}>`,
      to: newUser.email,
      subject: "Verify Email",
      html: `
        <h2>Email Verification</h2>
        <a href="${verifyLink}">${verifyLink}</a>
      `,
    });

    console.log("✅ Email Sent:", info.response);

    console.log("🎉 REGISTER SUCCESS");

    return new ApiResponse(201, "User registered successfully", newUser).send(res);

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.message);
    return next(new CustomError(error.message, 500));
  }
});


// ✅ VERIFY EMAIL
export const verifyEmail = expressAsyncHandler(async (req, res, next) => {
  console.log("🚀 VERIFY EMAIL START");

  const { token } = req.query;
  console.log("🔑 Raw token received:", token);

  // 🔐 Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  console.log("🔐 Hashed token:", hashedToken);

  const user = await userModel.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    console.log("❌ Invalid or expired token");
    return next(new CustomError("Invalid or expired token", 400));
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpiry = undefined;

  await user.save({ validateBeforeSave: false });

  console.log("✅ Email verified:", user.email);

  return new ApiResponse(200, "Email verified successfully").send(res);
});


// ✅ LOGIN
export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return next(new CustomError("Email not found", 404));

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new CustomError("Password not match", 400));

  if (!user.isVerified) {
    return next(new CustomError("Please verify email first", 400));
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return new ApiResponse(200, "Login successful", user).send(res);
});


// ✅ LOGOUT
export const logout = expressAsyncHandler(async (req, res) => {
  res.clearCookie("token");

  return new ApiResponse(200, "User logged out").send(res);
});


// ✅ CURRENT USER
export const currentUser = expressAsyncHandler(async (req, res) => {
  return new ApiResponse(200, "User is logged in", req.myUser).send(res);
});


// ✅ UPDATE PROFILE
export const updateProfile = expressAsyncHandler(async (req, res, next) => {
  const updateUser = await userModel.findByIdAndUpdate(
    req.myUser._id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateUser) return next(new CustomError("User not found", 404));

  return new ApiResponse(200, "User updated", updateUser).send(res);
});


// ✅ UPDATE PASSWORD
export const updatePassword = expressAsyncHandler(async (req, res) => {
  const existUser = await userModel.findById(req.myUser._id);

  existUser.password = req.body.password;
  await existUser.save();

  return new ApiResponse(200, "Password updated", existUser).send(res);
});


// (Optional for later)
export const forgotPassword = async () => {};
export const resetPassword = async () => {};