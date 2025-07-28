import Image from 'next/image';
import Link from 'next/link';

const allTemplates = [
  {
    id: 1,
    title: 'Классический шаблон',
    description: 'Элегантный и строгий стиль для традиционных свадеб.',
    image: 'https://placehold.co/800x500?text=Classic',
    style: 'Классика',
    season: 'Осень 2023',
    popularity: 5,
  },
  {
    id: 2,
    title: 'Современный минимализм',
    description: 'Лаконичный дизайн для современных пар.',
    image: 'https://placehold.co/800x500?text=Minimal',
    style: 'Минимализм',
    season: 'Весна 2025',
    popularity: 4,
  },
  {
    id: 3,
    title: 'Романтический акварель',
    description: 'Нежные цвета и акварельные элементы для романтиков.',
    image: 'https://placehold.co/800x500?text=Watercolor',
    style: 'Романтика',
    season: 'Лето 2025',
    popularity: 3,
  },
  {
    id: 4,
    title: 'Бохо стиль',
    description: 'Свободный и творческий стиль для неординарных свадеб.',
    image: 'https://placehold.co/800x500?text=Boho',
    style: 'Бохо',
    season: 'Осень 2025',
    popularity: 2,
  },
];

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const template = allTemplates.find(t => t.id === Number(params.id));
  if (!template) {
    return <div className="max-w-2xl mx-auto py-20 text-center text-gray-500 text-xl">Шаблон не найден</div>;
  }
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link href="/templates" className="text-primary-500 hover:underline mb-4 inline-block">← Назад к шаблонам</Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Image
          src={template.image}
          alt={template.title}
          width={800}
          height={500}
          className="object-cover w-full h-80"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
          <div className="flex gap-4 text-sm text-gray-400 mb-4">
            <span>{template.style}</span>
            <span>•</span>
            <span>{template.season}</span>
            <span>•</span>
            <span>Популярность: {template.popularity}★</span>
          </div>
          <p className="text-gray-700 mb-6">{template.description}</p>
          <Link href="/constructor">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded text-lg transition w-full">Создать своё приглашение</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 