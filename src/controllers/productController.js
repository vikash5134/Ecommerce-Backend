import prisma from '../config/database.js';

export const getAllProducts = async (req, res, next) => {
  try {
    const { category, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

    const where = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const orderBy = {};
    if (sort === 'price-asc') orderBy.price = 'asc';
    else if (sort === 'price-desc') orderBy.price = 'desc';
    else if (sort === 'rating') orderBy.rating = 'desc';
    else orderBy.createdAt = 'desc';

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body,
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    res.json(categories.map((c) => c.category));
  } catch (error) {
    next(error);
  }
};
