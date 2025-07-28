# ✅ Чек-лист деплоя проекта

## 📋 Что нужно сделать перед деплоем

### **1. Подготовка кода ✅**
- [x] Исправлен next.config.js
- [x] Создан vercel.json
- [x] Удалены лишние файлы
- [x] Почищен код (console.log)

### **2. Настройка Supabase**
- [ ] Создать проект в Supabase
- [ ] Получить DATABASE_URL и DIRECT_URL
- [ ] Получить API ключи
- [ ] Протестировать подключение к БД

### **3. Настройка Vercel**
- [ ] Создать аккаунт на Vercel
- [ ] Подключить GitHub репозиторий
- [ ] Настроить переменные окружения
- [ ] Настроить build settings

### **4. Замена MockPrismaClient**
- [ ] Заменить MockPrismaClient на реальный PrismaClient
- [ ] Установить зависимости Prisma
- [ ] Запустить миграции: `npx prisma db push`

### **5. Переменные окружения**

**Обязательные для Vercel:**
```env
# Supabase Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Frontend URLs
NEXT_PUBLIC_API_URL=https://your-backend.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app

# CORS
CORS_ORIGIN=https://your-frontend.vercel.app
```

**Опциональные:**
```env
# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### **6. Тестирование после деплоя**
- [ ] Проверить health check: `/health`
- [ ] Протестировать регистрацию/вход
- [ ] Протестировать создание приглашения
- [ ] Протестировать QR-коды
- [ ] Протестировать публичные страницы

## 🚀 Команды для деплоя

### **1. Подготовка репозитория:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### **2. Настройка Supabase:**
```bash
# После создания проекта в Supabase
cd backend
npx prisma generate
npx prisma db push
```

### **3. Замена MockPrismaClient:**
```bash
# Заменить в backend/src/utils/database.ts:
# MockPrismaClient → PrismaClient
```

## 🎯 Результат

После выполнения всех шагов:
- ✅ Рабочий сайт на Vercel
- ✅ База данных в Supabase
- ✅ Все функции работают
- ✅ Готов к продакшену

## 📞 Если что-то не работает

1. **Проверьте логи в Vercel**
2. **Проверьте подключение к Supabase**
3. **Убедитесь, что все переменные окружения настроены**
4. **Проверьте, что MockPrismaClient заменен на реальный** 