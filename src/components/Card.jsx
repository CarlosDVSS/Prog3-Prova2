
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ result }) {
  const genres = result.genres || [];
  console.log(`/${result.media_type}/${result.id}`);

  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-300 sm:m-2 transition-shadow duration-200'>
      <Link href={`/${result.media_type}/${result.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          width={500}
          height={300}
          className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
          alt={result.title || result.name}
        />
        <div className='p-2'>
          <h2 className=' text-white text-lg font-bold truncate'>
            {result.title || result.name}
          </h2>
          <div className='truncate flex items-center'>
            <p className='text-white'>
              {genres.length > 0 ? genres.join(' | ') : 'No genres available'}
            </p>
          </div>
          <p className=' text-white flex items-center'>
            {result.release_date
              ? result.release_date.substring(0, 4)
              : result.first_air_date
              ? result.first_air_date.substring(0, 4)
              : 'N/A'}
            <span className='ml-2'>
              {result.media_type === 'tv' ? 'Series' : 'Movie'}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
