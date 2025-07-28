import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { ValidationError, ConflictError, AuthenticationError } from '../utils/errors';
import { RegisterRequest, LoginRequest, AuthResponse } from '../types';

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, firstName, lastName, phone }: RegisterRequest = req.body;

  // Валидация
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  if (password.length < 6) {
    throw new ValidationError('Password must be at least 6 characters long');
  }

  // Проверка существующего пользователя
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ConflictError('User with this email already exists');
  }

  // Хеширование пароля
  const hashedPassword = await hashPassword(password);

  // Создание пользователя
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
      phone,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  // Генерация токена
  const token = generateToken({ userId: user.id, email: user.email });

  const response: AuthResponse = {
    user,
    token,
  };

  res.status(201).json({
    success: true,
    data: response,
    message: 'User registered successfully',
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password }: LoginRequest = req.body;

  // Валидация
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  // Поиск пользователя
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }

  // Проверка пароля
  const isPasswordValid = await comparePassword(password, user.hashedPassword);

  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid credentials');
  }

  // Генерация токена
  const token = generateToken({ userId: user.id, email: user.email });

  const response: AuthResponse = {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  };

  res.json({
    success: true,
    data: response,
    message: 'Login successful',
  });
}

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  // Пользователь уже добавлен в req.user через middleware
  const user = (req as any).user;

  res.json({
    success: true,
    data: user,
  });
} 