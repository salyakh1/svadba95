import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Очистка существующих данных
  await prisma.guest.deleteMany();
  await prisma.invitationSite.deleteMany();
  await prisma.template.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Создание тестового пользователя
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      hashedPassword: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS8mG', // password: test123
      firstName: 'Test',
      lastName: 'User',
    },
  });

  console.log('👤 Created test user:', testUser.email);

  // Создание шаблонов
  const templates = [
    {
      name: 'Классический',
      description: 'Элегантный классический дизайн с золотыми акцентами',
      previewUrl: '/templates/classic-preview.jpg',
      configJson: {
        colors: {
          primary: '#D4AF37',
          secondary: '#8B4513',
          accent: '#FFD700',
          background: '#FFFFFF',
          text: '#2C2C2C',
        },
        fonts: {
          heading: 'Playfair Display',
          body: 'Lora',
          accent: 'Great Vibes',
        },
        layout: {
          type: 'classic',
          sections: [
            {
              id: 'header',
              type: 'header',
              config: {
                title: 'Приглашение на свадьбу',
                subtitle: 'Александр & Мария',
              },
            },
            {
              id: 'content',
              type: 'content',
              config: {
                date: '15 июня 2024',
                time: '16:00',
                venue: 'Ресторан "Элегант"',
                address: 'ул. Пушкина, 10',
              },
            },
            {
              id: 'rsvp',
              type: 'rsvp',
              config: {
                enabled: true,
                requireMealPreference: true,
                mealOptions: ['Мясо', 'Рыба', 'Вегетарианское'],
              },
            },
          ],
        },
        animations: {
          enabled: true,
          type: 'fade',
        },
      },
      isPremium: false,
    },
    {
      name: 'Современный',
      description: 'Минималистичный современный дизайн',
      previewUrl: '/templates/modern-preview.jpg',
      configJson: {
        colors: {
          primary: '#2C3E50',
          secondary: '#3498DB',
          accent: '#E74C3C',
          background: '#ECF0F1',
          text: '#2C3E50',
        },
        fonts: {
          heading: 'Montserrat',
          body: 'Open Sans',
          accent: 'Roboto',
        },
        layout: {
          type: 'modern',
          sections: [
            {
              id: 'header',
              type: 'header',
              config: {
                title: 'Мы женимся!',
                subtitle: 'Дмитрий & Анна',
              },
            },
            {
              id: 'content',
              type: 'content',
              config: {
                date: '22 июля 2024',
                time: '18:00',
                venue: 'Банкетный зал "Современник"',
                address: 'пр. Мира, 25',
              },
            },
            {
              id: 'gallery',
              type: 'gallery',
              config: {
                enabled: true,
                maxPhotos: 6,
              },
            },
            {
              id: 'rsvp',
              type: 'rsvp',
              config: {
                enabled: true,
                requireMealPreference: true,
                mealOptions: ['Стейк', 'Лосось', 'Паста'],
              },
            },
          ],
        },
        animations: {
          enabled: true,
          type: 'slide',
        },
      },
      isPremium: true,
    },
    {
      name: 'Романтический',
      description: 'Нежный романтический дизайн с цветочными мотивами',
      previewUrl: '/templates/romantic-preview.jpg',
      configJson: {
        colors: {
          primary: '#FF69B4',
          secondary: '#FFB6C1',
          accent: '#FF1493',
          background: '#FFF0F5',
          text: '#4A4A4A',
        },
        fonts: {
          heading: 'Dancing Script',
          body: 'Crimson Text',
          accent: 'Great Vibes',
        },
        layout: {
          type: 'elegant',
          sections: [
            {
              id: 'header',
              type: 'header',
              config: {
                title: 'С любовью приглашаем',
                subtitle: 'Михаил & Елена',
              },
            },
            {
              id: 'content',
              type: 'content',
              config: {
                date: '8 августа 2024',
                time: '17:00',
                venue: 'Сад "Романтика"',
                address: 'ул. Садовая, 15',
              },
            },
            {
              id: 'rsvp',
              type: 'rsvp',
              config: {
                enabled: true,
                requireMealPreference: false,
                allowNotes: true,
              },
            },
          ],
        },
        animations: {
          enabled: true,
          type: 'zoom',
        },
      },
      isPremium: false,
    },
  ];

  for (const template of templates) {
    await prisma.template.create({
      data: template,
    });
  }

  console.log('📝 Created', templates.length, 'templates');

  // Создание тестового сайта приглашения
  const testSite = await prisma.invitationSite.create({
    data: {
      userId: testUser.id,
      templateId: (await prisma.template.findFirst())!.id,
      title: 'Наша свадьба',
      slug: 'test-wedding',
      configJson: templates[0].configJson,
      rsvpConfigJson: {
        enabled: true,
        requireMealPreference: true,
        mealOptions: ['Мясо', 'Рыба', 'Вегетарианское'],
        requireTableNumber: false,
        allowNotes: true,
        customFields: [],
      },
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log('💒 Created test invitation site:', testSite.slug);

  // Создание тестовых гостей
  const testGuests = [
    {
      name: 'Иван Петров',
      email: 'ivan@example.com',
      phone: '+7 999 123-45-67',
      rsvpStatus: 'CONFIRMED',
      mealPreference: 'Мясо',
      tableNumber: 1,
    },
    {
      name: 'Мария Сидорова',
      email: 'maria@example.com',
      phone: '+7 999 234-56-78',
      rsvpStatus: 'CONFIRMED',
      mealPreference: 'Рыба',
      tableNumber: 1,
    },
    {
      name: 'Алексей Козлов',
      email: 'alex@example.com',
      phone: '+7 999 345-67-89',
      rsvpStatus: 'DECLINED',
      mealPreference: null,
      tableNumber: null,
    },
    {
      name: 'Елена Волкова',
      email: 'elena@example.com',
      phone: '+7 999 456-78-90',
      rsvpStatus: 'PENDING',
      mealPreference: null,
      tableNumber: null,
    },
  ];

  for (const guest of testGuests) {
    await prisma.guest.create({
      data: {
        ...guest,
        invitationSiteId: testSite.id,
      },
    });
  }

  console.log('👥 Created', testGuests.length, 'test guests');

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Test Data:');
  console.log('👤 Test User: test@example.com / test123');
  console.log('💒 Test Site: http://localhost:3000/site/test-wedding');
  console.log('🔗 API: http://localhost:3001/api');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 