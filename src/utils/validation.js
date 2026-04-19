import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  image: z.string().url(),
  stock: z.number().int().nonnegative(),
});

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  shippingAddress: z.string().min(1),
  paymentMethod: z.enum(["cod", "card", "upi", "wallet", "emi"]).default("cod"),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(1),
});
