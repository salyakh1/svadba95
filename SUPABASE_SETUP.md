# 🗄️ Настройка Supabase для проекта

## 📋 Пошаговая инструкция

### **1. Создание проекта в Supabase**

1. **Перейдите на [supabase.com](https://supabase.com)**
2. **Войдите через GitHub**
3. **Нажмите "New Project"**
4. **Заполните форму:**
   - Organization: выберите вашу организацию
   - Project name: `wedding-invitations`
   - Database password: придумайте надежный пароль
   - Region: выберите ближайший к вам регион
5. **Нажмите "Create new project"**

### **2. Получение данных для подключения**

1. **В проекте перейдите в Settings → API**
2. **Скопируйте следующие данные:**
   - **Project URL** (например: `https://abcdefghijklmnop.supabase.co`)
   - **anon public key** (начинается с `eyJ...`)
   - **service_role secret key** (начинается с `eyJ...`)
   - **Database password** (который вы создали)

### **3. Настройка базы данных**

1. **Перейдите в SQL Editor**
2. **Выполните команду для создания таблиц:**
   ```sql
   -- Создание таблиц (Prisma сделает это автоматически)
   -- Но можно проверить подключение:
   SELECT version();
   ```

### **4. Переменные окружения для Vercel**

Добавьте эти переменные в Vercel:

```env
# Supabase Database
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Supabase Auth (опционально)
SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=https://your-project.vercel.app

# CORS
CORS_ORIGIN=https://your-project.vercel.app

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

### **5. Замена MockPrismaClient на реальный**

После настройки Supabase замените в `backend/src/utils/database.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
```

### **6. Запуск миграций**

```bash
cd backend
npx prisma generate
npx prisma db push
```

### **7. Проверка подключения**

```bash
# Проверьте health check
curl https://your-backend.vercel.app/health
```

## 🎯 Результат

После выполнения всех шагов у вас будет:
- ✅ Рабочая база данных PostgreSQL в облаке
- ✅ Автоматические резервные копии
- ✅ Веб-интерфейс для управления данными
- ✅ API для прямого доступа к базе
- ✅ Аутентификация и авторизация 