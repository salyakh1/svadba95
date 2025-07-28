"use client";

import Link from 'next/link';
import { useState } from 'react';

const allTemplates = [
  {
    id: 1,
    title: 'Классический шаблон',
    description: 'Элегантный и строгий стиль для традиционных свадеб.',
    image: 'https://placehold.co/400x250?text=Classic',
    style: 'Классика',
    season: 'Осень 2023',
    popularity: 5,
  },
  {
    id: 2,
    title: 'Современный минимализм',
    description: 'Лаконичный дизайн для современных пар.',
    image: 'https://placehold.co/400x250?text=Minimal',
    style: 'Минимализм',
    season: 'Весна 2025',
    popularity: 4,
  },
  {
    id: 3,
    title: 'Романтический акварель',
    description: 'Нежные цвета и акварельные элементы для романтиков.',
    image: 'https://placehold.co/400x250?text=Watercolor',
    style: 'Романтика',
    season: 'Лето 2025',
    popularity: 3,
  },
  {
    id: 4,
    title: 'Бохо стиль',
    description: 'Свободный и творческий стиль для неординарных свадеб.',
    image: 'https://placehold.co/400x250?text=Boho',
    style: 'Бохо',
    season: 'Осень 2025',
    popularity: 2,
  },
];

const styles = ['Все стили', 'Классика', 'Минимализм', 'Романтика', 'Бохо'];
const seasons = ['Все сезоны', 'Осень 2023', 'Весна 2025', 'Лето 2025', 'Осень 2025'];

export default function TemplatesPage() {
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('Все стили');
  const [season, setSeason] = useState('Все сезоны');

  const filtered = allTemplates.filter(tpl => {
    const matchesSearch = tpl.title.toLowerCase().includes(search.toLowerCase()) || tpl.description.toLowerCase().includes(search.toLowerCase());
    const matchesStyle = style === 'Все стили' || tpl.style === style;
    const matchesSeason = season === 'Все сезоны' || tpl.season === season;
    return matchesSearch && matchesStyle && matchesSeason;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Шаблоны приглашений</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-border rounded px-4 py-2 w-full md:w-1/3 focus:outline-primary-500"
        />
        <select value={style} onChange={e => setStyle(e.target.value)} className="border border-border rounded px-4 py-2">
          {styles.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={season} onChange={e => setSeason(e.target.value)} className="border border-border rounded px-4 py-2">
          {seasons.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">Нет подходящих шаблонов</div>
        )}
        {filtered.map((tpl) => (
          <div key={tpl.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition">
            <Link href={`/templates/${tpl.id}`} className="block">
              <img
                src={tpl.image}
                alt={tpl.title}
                width={400}
                height={250}
                className="object-cover w-full h-48 hover:scale-105 transition"
              />
            </Link>
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-2">{tpl.title}</h2>
              <div className="flex gap-2 text-xs text-gray-400 mb-2">
                <span>{tpl.style}</span>
                <span>•</span>
                <span>{tpl.season}</span>
                <span>•</span>
                <span>Популярность: {tpl.popularity}★</span>
              </div>
              <p className="text-gray-600 mb-4 flex-1">{tpl.description}</p>
              <Link href={`/templates/${tpl.id}`} className="mt-auto bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded transition text-center">Посмотреть</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 