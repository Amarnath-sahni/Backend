import { Router } from "express";
import { register, login, logout, updateProfile, updatePassword, currentUser,verifyEmail} from "../../controller/user/user.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { loginSchema, userSchema, updateProfileSchema, updatePasswordSchema} from "../../validators/velidation.validators.js";
import {authenticate} from "../../middleware/auth.middleware.js" //for authenticate 
//import authenticate and use to prevent current user to login again

const router = Router();

router.post("/register", validate(userSchema), register);
router.get("/verify-email", verifyEmail);
router.post("/login",validate(loginSchema), login);
router.delete("/logout",authenticate, logout);


router.patch("/update-profile",authenticate,validate(updateProfileSchema), updateProfile);
router.patch("/update-password",authenticate,validate(updatePasswordSchema), updatePassword);

//this is for frontend  --> check the successs
router.get("/current",authenticate, currentUser);
export default router;
