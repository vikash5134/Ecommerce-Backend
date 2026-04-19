import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { orderSchema } from '../utils/validation.js';

const router = express.Router();

router.use(authenticate);

router.post('/', validate(orderSchema), createOrder);
router.get('/my-orders', getMyOrders);
router.get('/all', isAdmin, getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', isAdmin, updateOrderStatus);

export default router;
