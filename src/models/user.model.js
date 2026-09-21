import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, lowercase: true },

    password: { type: String, required: true, minlength: 6 },

    phone: { type: String, required: true },

    role: { type: String, enum: ["user", "admin"], default: "user" },

    isVerified: { type: Boolean, default: false },

    // Email verification
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },

    // Password reset
  },
  {
    timestamps: true,
  }
);


// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});


// 🔑 Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};


// 📧 Generate Email Verification Token
userSchema.methods.generateEmailVerificationToken = function () {

  // Step 1: create raw token
  const token = crypto.randomBytes(32).toString("hex");

  // Step 2: hash token (store in DB)
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // Step 3: save in DB
  this.emailVerificationToken = hashedToken;

  // Step 4: expiry (10 min)
  this.emailVerificationTokenExpiry = Date.now() + 10 * 60 * 1000;

  // Step 5: return raw token
  return token;
};


export default model("User", userSchema);