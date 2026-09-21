import joi from "joi";

export const AddressSchema = joi.object({
   // userId: joi.string().min(12).max(16).optional(),
    addressLine: joi.string().min(3).max(40).required(),
    city: joi.string().min(3).max(20).required(),
    state: joi.string().min(2).max(20).required(),
    pinCode: joi.string().min(4).max(10).required(),
    phone: joi.string().min(10).max(12).required(),
    notes: joi.string().min(10).max(50).optional(),
})
