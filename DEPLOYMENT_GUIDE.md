# Руководство по развертыванию для продакшена

## Вариант 1: Локальный сервер с внешним доступом

### Шаг 1: Узнайте IP-адрес вашего компьютера
```bash
# Windows
ipconfig

# Найдите строку "IPv4 Address" - это ваш IP (например, 192.168.1.100)
```

### Шаг 2: Создайте файл .env.local в папке frontend
```
NEXT_PUBLIC_SITE_URL=http://ВАШ_IP_АДРЕС:3000
NEXT_PUBLIC_API_URL=http://ВАШ_IP_АДРЕС:3001
```

### Шаг 3: Запустите сервер с внешним доступом
```bash
# Frontend
npm run dev:external

# Backend (в отдельном терминале)
cd ../backend
npm run dev
```

### Шаг 4: Откройте порты в брандмауэре Windows
1. Откройте "Брандмауэр Защитника Windows"
2. Нажмите "Дополнительные параметры"
3. Выберите "Правила для входящих подключений" → "Создать правило"
4. Выберите "Для порта"
5. Укажите порты: 3000, 3001
6. Разрешите подключение

## Вариант 2: Бесплатный хостинг (Рекомендуется)

### Vercel (Самый простой)
1. Зарегистрируйтесь на https://vercel.com
2. Установите Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Войдите в аккаунт:
   ```bash
   vercel login
   ```
4. Разверните проект:
   ```bash
   vercel
   ```

### Netlify
1. Зарегистрируйтесь на https://netlify.com
2. Подключите GitHub репозиторий
3. Настройте сборку:
   - Build command: `npm run build`
   - Publish directory: `out`

## Вариант 3: Платный хостинг

### DigitalOcean
- Droplet: $5/месяц
- Полный контроль над сервером

### Heroku
- Hobby: $7/месяц
- Простое развертывание

### AWS/Azure
- Более сложная настройка
- Масштабируемость

## Настройка домена

После развертывания на хостинге:
1. Купите домен (например, weddinginvitations.ru)
2. Настройте DNS записи
3. Обновите переменные окружения с новым доменом

## Мониторинг и аналитика

### Google Analytics
Добавьте в layout.tsx:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Uptime мониторинг
- UptimeRobot (бесплатно)
- Pingdom
- StatusCake

## Резервное копирование

### База данных
```bash
# PostgreSQL
pg_dump -h localhost -U username database_name > backup.sql
```

### Файлы
```bash
# Автоматическое резервное копирование
rsync -av /path/to/project /backup/location
```

## Безопасность

### SSL сертификат
- Let's Encrypt (бесплатно)
- Cloudflare (бесплатно)

### Защита от DDoS
- Cloudflare
- AWS Shield

## Масштабирование

### Для 5+ заказов в день:
- Vercel/Netlify достаточно
- База данных: PostgreSQL на Railway или Supabase

### Для 50+ заказов в день:
- Выделенный сервер
- CDN для статических файлов
- Кэширование (Redis)

### Для 500+ заказов в день:
- Микросервисная архитектура
- Балансировщик нагрузки
- Автоматическое масштабирование 