// validators/blog.validation.js
import Joi from "joi";

export const createBlogValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    category: Joi.string().required(),
    createdBy: Joi.object({
      _id: Joi.string().required(),
      userName: Joi.string().required(),
    }).required(),
  });

  return schema.validate(data);
};

export const updateBlogValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().min(5),
    category: Joi.string(),
  });

  return schema.validate(data);
};