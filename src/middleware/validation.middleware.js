import CustomError from "../utils/CustomError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      // allUnknown: false,
    });

    if (error) {
      // Fix applied here: Use .join(". ") to create a single, clean string
      const errorMessage = error.details.map((ele) => ele.message);
      
    }
    req.body = value;
    next();
  };
};