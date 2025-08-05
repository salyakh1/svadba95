# ⚡ Быстрый деплой на Vercel + Supabase

## 🚀 Быстрый старт (5 минут)

### 1. Подготовка
```bash
# Клонируйте проект
git clone https://github.com/YOUR_USERNAME/wedding-invitations.git
cd wedding-invitations

# Установите зависимости
npm run install:all
```

### 2. Supabase (2 минуты)
1. Создайте проект на [supabase.com](https://supabase.com)
2. Скопируйте **Project URL** и **Database Password**
3. Запустите миграции:
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 3. Vercel (2 минуты)
1. Создайте проект на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Добавьте переменные окружения (см. ниже)
4. Нажмите "Deploy"

### 4. Переменные окружения в Vercel
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-project.vercel.app
CORS_ORIGIN=https://your-project.vercel.app
```

### 5. Готово! 🎉
Ваш сайт будет доступен по адресу: `https://your-project.vercel.app`

## 📋 Что включено
- ✅ Создание свадебных приглашений
- ✅ QR-коды для каждого приглашения
- ✅ Управление гостями и RSVP
- ✅ Email/SMS рассылка
- ✅ Система заказов
- ✅ Публичные страницы приглашений
- ✅ Адаптивный дизайн

## 🔧 Настройка домена
1. Купите домен
2. В Vercel: Settings → Domains
3. Добавьте ваш домен
4. Настройте DNS записи

## 📞 Поддержка
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Supabase**: [supabase.com/support](https://supabase.com/support)
- **GitHub Issues**: Создайте issue в репозитории 