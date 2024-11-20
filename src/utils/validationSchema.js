const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().lowercase(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  roles: Joi.array().items(Joi.string()),
});

const productSchema = Joi.object({
  name: Joi.string().lowercase(),
  description: Joi.string().lowercase(),
  price: Joi.number().min(1),
  owner: Joi.string().alphanum(),
});

module.exports = { authSchema, productSchema };
