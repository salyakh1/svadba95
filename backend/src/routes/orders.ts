import express from 'express';
import { authenticateUser, requireAuth } from '../middleware/auth';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderStats,
} from '../controllers/orderController';

const router = express.Router();

// Все роуты требуют аутентификации
router.use(authenticateUser);
router.use(requireAuth);

// Создание заказа
router.post('/', createOrder);

// Получение заказов пользователя
router.get('/', getUserOrders);

// Получение статистики заказов
router.get('/stats', getOrderStats);

// Получение заказа по ID
router.get('/:id', getOrderById);

// Обновление статуса заказа
router.patch('/:id/status', updateOrderStatus);

// Отмена заказа
router.delete('/:id', cancelOrder);

export default router; 