import prisma from '../config/database.js';

export const getCart = async (req, res, next) => {
  try {
    let cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.user.id },
        include: { items: { include: { product: true } } },
      });
    }

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    res.json({ cart, total });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: req.user.id },
      });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
    });

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { itemId } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true, product: true },
    });

    if (!cartItem || cartItem.cart.userId !== req.user.id) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (cartItem.product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
    });

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== req.user.id) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    const updatedCart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
    });

    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
};
