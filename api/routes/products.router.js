import express from 'express';
import ProductService from '../services/product.services.js';
import validatorHandler from '../middleware/validator.handler.js';
import { createProductSchema, getProductSchema, updateProductSchema, replaceProductSchema } from '../schemas/product.schema.js';

const router = express.Router();
const productService = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const products = await productService.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productService.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const body = req.body;
    const product = await productService.create(body);
    res.status(201).json({
      message: 'created',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id',
  //Se pueden inyectar varios middlewares en un endpoint
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productService.update(body, id);
    res.json({
      message: 'updated',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(replaceProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productService.replace(body, id);
    res.json({
      message: 'replaced',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.delete(id);
    res.json({
      id,
      message: 'deleted',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
