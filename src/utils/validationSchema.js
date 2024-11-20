const Joi = require("joi");

const authSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  roles: Joi.array().items(Joi.string()).required(),
});

const productSchema = Joi.object({
  name: Joi.string().lowercase().required(),
  description: Joi.string().lowercase().required(),
  price: Joi.number().min(1).required(),
  owner: Joi.string().alphanum(),
});

const orderSchema = Joi.object({
  user: Joi.string().alphanum(),
  products: Joi.array().items(Joi.string().alphanum()).required(),
  totalPrice: Joi.number().min(1).required(),
  status: Joi.array().items(Joi.string),
});

module.exports = { authSchema, productSchema, orderSchema };
