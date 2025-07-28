import { Request, Response } from 'express';
import { prisma } from '../utils/database';
import { NotFoundError } from '../utils/errors';

export async function getAllTemplates(req: Request, res: Response): Promise<void> {
  const { isPremium, isActive } = req.query;

  const where: any = {};

  if (isPremium !== undefined) {
    where.isPremium = isPremium === 'true';
  }

  if (isActive !== undefined) {
    where.isActive = isActive === 'true';
  }

  const templates = await prisma.template.findMany({
    where,
    select: {
      id: true,
      name: true,
      description: true,
      previewUrl: true,
      isPremium: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: templates,
  });
}

export async function getTemplateById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const template = await prisma.template.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      previewUrl: true,
      configJson: true,
      isPremium: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!template) {
    throw new NotFoundError('Template not found');
  }

  res.json({
    success: true,
    data: template,
  });
}

export async function createTemplate(req: Request, res: Response): Promise<void> {
  const { name, description, previewUrl, configJson, isPremium } = req.body;

  const template = await prisma.template.create({
    data: {
      name,
      description,
      previewUrl,
      configJson,
      isPremium: isPremium || false,
    },
    select: {
      id: true,
      name: true,
      description: true,
      previewUrl: true,
      configJson: true,
      isPremium: true,
      isActive: true,
      createdAt: true,
    },
  });

  res.status(201).json({
    success: true,
    data: template,
    message: 'Template created successfully',
  });
}

export async function updateTemplate(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { name, description, previewUrl, configJson, isPremium, isActive } = req.body;

  const template = await prisma.template.update({
    where: { id },
    data: {
      name,
      description,
      previewUrl,
      configJson,
      isPremium,
      isActive,
    },
    select: {
      id: true,
      name: true,
      description: true,
      previewUrl: true,
      configJson: true,
      isPremium: true,
      isActive: true,
      updatedAt: true,
    },
  });

  res.json({
    success: true,
    data: template,
    message: 'Template updated successfully',
  });
}

export async function deleteTemplate(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  await prisma.template.delete({
    where: { id },
  });

  res.json({
    success: true,
    message: 'Template deleted successfully',
  });
} 