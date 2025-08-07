"use client";

import { useState } from 'react';

export default function ConstructorPage() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Конструктор свадебных приглашений
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Тестовая страница
          </h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              Это тестовая версия конструктора для проверки деплоя.
            </p>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCount(count + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Счетчик: {count}
              </button>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800">
                ✅ Если вы видите эту страницу, значит деплой прошел успешно!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
