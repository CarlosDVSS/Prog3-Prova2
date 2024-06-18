"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ currentPage }) {
  const searchParams = useSearchParams();
  const genre = searchParams.get('genre');
  const currentPageNumber = parseInt(currentPage, 10);

  return (
    <div className='flex justify-center my-4'>
      {currentPageNumber > 1 && (
        <Link
          href={{
            pathname: '/',
            query: { genre, page: currentPageNumber - 1 }
          }}
          className='m-2 text-white text-roxo-hover font-semibold p-2'
        >
          Previous
        </Link>
      )}
      <Link
        href={{
          pathname: '/',
          query: { genre, page: currentPageNumber + 1 }
        }}
        className='m-2 text-white text-roxo-hover font-semibold p-2'
      >
        Next
      </Link>
    </div>
  );
}
