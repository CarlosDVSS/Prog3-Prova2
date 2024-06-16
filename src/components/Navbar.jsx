"use client";
import NavbarItem from './NavbarItem';
import genres from '@/app/utils/genres';
import { useSearchParams } from 'next/navigation';

export default function Navbar() {
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get('genre');

  return (
    <div className='flex dark:bg-gray-600 bg-amber-100 p-4 lg:text-lg justify-center gap-6 flex-wrap'>
      {genres.map((genre) => (
        <NavbarItem
          key={genre.id}
          title={genre.name}
          param={genre.id}
          isActive={selectedGenre == genre.id}
        />
      ))}
    </div>
  );
}

