import prisma from '../config/database.js';

export const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`,
        });
      }
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        totalAmount,
        shippingAddress,
        paymentMethod,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    for (const item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } }, user: true },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } }, user: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, isPaid, isDelivered } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (isPaid !== undefined) {
      updateData.isPaid = isPaid;
      if (isPaid) updateData.paidAt = new Date();
    }
    if (isDelivered !== undefined) {
      updateData.isDelivered = isDelivered;
      if (isDelivered) updateData.deliveredAt = new Date();
    }

    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: updateData,
      include: { items: { include: { product: true } } },
    });

    res.json(order);
  } catch (error) {
    next(error);
  }
};
