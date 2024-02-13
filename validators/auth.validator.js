const Joi = require("joi")

const signupSchema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
  
    username: Joi.string().alphanum().min(3).max(30).required(),
    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  
  const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
  
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  }).or("email", "username");

  const validateSignUpMiddleware = (req, res, next) => {
    try {
      const { error, value } = signupSchema.validate(req.body);
      if (error) {
        return res.status(404).json({
          message: error.message,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  };
  
  const validateLoginMiddleware = (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res.status(404).json({
          message: error,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  };
  
  module.exports = { validateLoginMiddleware, validateSignUpMiddleware };