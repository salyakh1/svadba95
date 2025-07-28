import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { ValidationError, NotFoundError, ConflictError } from '../utils/errors';
import { AuthenticatedRequest } from '../types';

// Создание заказа
export async function createOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { 
    invitationSiteId, 
    totalAmount, 
    currency = 'RUB',
    paymentMethod,
    customerInfo,
    deliveryInfo,
    notes,
    items 
  } = req.body;

  // Валидация
  if (!invitationSiteId || !totalAmount || !items || items.length === 0) {
    throw new ValidationError('Invitation site ID, total amount, and items are required');
  }

  // Проверка существования сайта приглашения
  const invitationSite = await prisma.invitationSite.findFirst({
    where: { id: invitationSiteId, userId },
  });

  if (!invitationSite) {
    throw new NotFoundError('Invitation site not found');
  }

  // Генерация номера заказа
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  // Создание заказа с элементами
  const order = await prisma.order.create({
    data: {
      userId,
      invitationSiteId,
      orderNumber,
      totalAmount,
      currency,
      paymentMethod,
      customerInfo,
      deliveryInfo,
      notes,
      orderItems: {
        create: items.map((item: any) => ({
          productType: item.productType,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
          description: item.description,
        })),
      },
    },
    include: {
      orderItems: true,
      invitationSite: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    data: order,
    message: 'Order created successfully',
  });
}

// Получение заказов пользователя
export async function getUserOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      orderItems: true,
      invitationSite: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: orders,
  });
}

// Получение заказа по ID
export async function getOrderById(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;

  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      orderItems: true,
      invitationSite: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  res.json({
    success: true,
    data: order,
  });
}

// Обновление статуса заказа
export async function updateOrderStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  // Проверка владения заказом
  const existingOrder = await prisma.order.findFirst({
    where: { id, userId },
  });

  if (!existingOrder) {
    throw new NotFoundError('Order not found');
  }

  const updateData: any = {};
  if (status) updateData.status = status;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;

  const order = await prisma.order.update({
    where: { id },
    data: updateData,
    include: {
      orderItems: true,
      invitationSite: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: order,
    message: 'Order status updated successfully',
  });
}

// Отмена заказа
export async function cancelOrder(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;
  const { id } = req.params;

  // Проверка владения заказом
  const existingOrder = await prisma.order.findFirst({
    where: { id, userId },
  });

  if (!existingOrder) {
    throw new NotFoundError('Order not found');
  }

  // Проверка возможности отмены
  if (existingOrder.status === 'SHIPPED' || existingOrder.status === 'DELIVERED') {
    throw new ValidationError('Cannot cancel order that is already shipped or delivered');
  }

  const order = await prisma.order.update({
    where: { id },
    data: {
      status: 'CANCELLED',
    },
    include: {
      orderItems: true,
      invitationSite: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  res.json({
    success: true,
    data: order,
    message: 'Order cancelled successfully',
  });
}

// Получение статистики заказов
export async function getOrderStats(req: AuthenticatedRequest, res: Response): Promise<void> {
  const userId = req.user!.id;

  const stats = await prisma.order.groupBy({
    by: ['status'],
    where: { userId },
    _count: {
      status: true,
    },
    _sum: {
      totalAmount: true,
    },
  });

  const totalOrders = await prisma.order.count({
    where: { userId },
  });

  const totalRevenue = await prisma.order.aggregate({
    where: { 
      userId,
      paymentStatus: 'PAID',
    },
    _sum: {
      totalAmount: true,
    },
  });

  res.json({
    success: true,
    data: {
      stats,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    },
  });
} 