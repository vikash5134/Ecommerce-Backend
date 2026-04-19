import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from '../controllers/productController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { productSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);
router.post('/', authenticate, isAdmin, validate(productSchema), createProduct);
router.put('/:id', authenticate, isAdmin, validate(productSchema), updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;
