"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


export default function NavbarItem({ title, param, isActive }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');
  const baseClasses = 'm-2 text-white bg-roxo-hover font-semibold p-2';
  const activeClasses = 'text-roxo underline';

  return (
    <div>
      <Link
        href={{
          pathname: '/',
          query: { genre: param }
        }}
        className={`${baseClasses} ${isActive ? activeClasses : ''}`}
      >
        {title}
      </Link>
    </div>
  );
}
