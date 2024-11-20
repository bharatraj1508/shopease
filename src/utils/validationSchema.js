const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().lowercase(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  roles: Joi.array().items(Joi.string()),
});

module.exports = { authSchema };
