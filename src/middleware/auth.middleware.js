import expressAsyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import CustomError from "../utils/CustomError.js";
import userModel from "../models/user.model.js";

export const authenticate = expressAsyncHandler(async (req, res, next)=>{
    const token = req?.cookies?.token;
    if(!token) next(new CustomError(401, "please login to this route"));

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//jwt secrete key
    const user = await userModel.findById(decodedToken.id);
    if(!user) next(new CustomError(401, "invalid Session, please loggin again").send(res));

    res.myUser = user;
    next();
})