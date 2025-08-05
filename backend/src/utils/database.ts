// Временное решение для обхода проблемы с Prisma Client
// TODO: Заменить на реальный Prisma Client после исправления сетевых проблем

// Заглушка для Prisma Client
class MockPrismaClient {
  async $connect() {
    console.log('✅ Mock database connected');
  }
  
  async $disconnect() {
    console.log('✅ Mock database disconnected');
  }
  
  // Заглушки для моделей
  user = {
    findUnique: async () => null,
    create: async (data: any) => ({ id: 'mock-id', ...data.data }),
    findMany: async () => [],
  };
  
  template = {
    findMany: async () => [],
    findUnique: async () => null,
  };
  
  invitationSite = {
    findMany: async () => [],
    findUnique: async () => null,
    create: async (data: any) => ({ id: 'mock-id', ...data.data }),
    update: async () => ({}),
    delete: async () => ({}),
  };
  
  guest = {
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock-id', ...data.data }),
    update: async () => ({}),
    delete: async () => ({}),
  };
  
  order = {
    findMany: async () => [],
    create: async (data: any) => ({ id: 'mock-id', ...data.data }),
  };
}

declare global {
  var __prisma: MockPrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new MockPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Не выходим из процесса в development
    if (process.env['NODE_ENV'] === 'production') {
      process.exit(1);
    }
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
  }
} 