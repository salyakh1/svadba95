import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController';
import { authenticateUser, requireAuth } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Регистрация
router.post('/register', asyncHandler(register));

// Вход
router.post('/login', asyncHandler(login));

// Получить текущего пользователя
router.get('/me', authenticateUser, requireAuth, asyncHandler(getCurrentUser));

export default router; 