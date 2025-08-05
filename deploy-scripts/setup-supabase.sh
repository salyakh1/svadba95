#!/bin/bash

# Скрипт для настройки Supabase базы данных
echo "🚀 Настройка Supabase базы данных..."

# Проверяем наличие Prisma CLI
if ! command -v npx &> /dev/null; then
    echo "❌ npx не найден. Установите Node.js"
    exit 1
fi

# Генерируем Prisma клиент
echo "📦 Генерация Prisma клиента..."
cd backend
npx prisma generate

# Применяем миграции
echo "🗄️ Применение миграций базы данных..."
npx prisma db push

# Запускаем seed скрипт
echo "🌱 Запуск seed скрипта..."
npm run db:seed

echo "✅ Supabase настройка завершена!"
echo "📊 Проверьте базу данных в Supabase Dashboard" 