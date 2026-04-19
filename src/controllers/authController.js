import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password, address } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        address,
      },
      select: { id: true, username: true, email: true, isAdmin: true, address: true },
    });

    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
