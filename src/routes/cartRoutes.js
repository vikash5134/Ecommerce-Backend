import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { cartItemSchema } from '../utils/validation.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getCart);
router.post('/items', validate(cartItemSchema), addToCart);
router.put('/items/:itemId', updateCartItem);
router.delete('/items/:itemId', removeFromCart);
router.delete('/', clearCart);

export default router;
