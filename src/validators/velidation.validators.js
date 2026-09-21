import joi from 'joi'; //its define simple structure

export const userSchema = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().min(3).max(20).email().required(),
    phone: joi.string().length(10).required().pattern(/^[6-9]\d{9}$/).message("invalid mobile number"),
    password: joi.string().min(6).max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")).message("Password must contain at least one letter and one number")
    .required(),

})

export const loginSchema = joi.object({
   email: joi.string().min(3).max(20).email().required(),
   password: joi.string().min(6).max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")).message("Password must contain at least one letter and one number")
    .required(),
})

export const updateProfileSchema = joi.object({
   name: joi.string().min(3).max(20).required().optional(),
    email: joi.string().min(3).max(20).email().required().optional(),
    phone: joi.string().length(10).required().pattern(/^[6-9]\d{9}$/).message("invalid mobile number").optional(),
})

export const updatePasswordSchema = joi.object({
    password: joi.string().min(6).max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$")).message("Password must contain at least one letter and one number")
    .required(),
})