import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const price = Joi.number().min(10);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
})

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  isBlock,
})

const replaceProductSchema = createProductSchema;

const getProductSchema = Joi.object({
  id: id.required()
})

export { createProductSchema, updateProductSchema, replaceProductSchema, getProductSchema};





