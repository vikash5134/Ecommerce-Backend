import express from 'express';
import { createReview, getProductReviews } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { reviewSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/:productId', getProductReviews);
router.post('/:productId', authenticate, validate(reviewSchema), createReview);

export default router;
