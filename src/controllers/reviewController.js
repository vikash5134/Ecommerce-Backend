import prisma from '../config/database.js';

export const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: req.user.id,
        username: req.user.username,
        rating,
        comment,
      },
    });

    const reviews = await prisma.review.findMany({ where: { productId } });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: avgRating,
        numReviews: reviews.length,
      },
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: req.params.productId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
