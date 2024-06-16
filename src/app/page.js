
import Results from '@/components/Results';
import genres from '@/app/utils/genres';
import Pagination from '@/components/Pagination';

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const genreId = searchParams.genre;
  const page = searchParams.page || 1;
  const genreQuery = genreId ? `&with_genres=${genreId}` : '';

  const yearQueryMovie = `&primary_release_year=2024`;
  const yearQueryTv = `&first_air_date.gte=2024-01-01`;


  const resMovies = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}${genreQuery}${yearQueryMovie}`
  );
  const resTvShows = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}${genreQuery}${yearQueryTv}`
  );

  const dataMovies = await resMovies.json();
  const dataTvShows = await resTvShows.json();


  const results = [...dataMovies.results, ...dataTvShows.results].map(item => ({
    ...item,
    media_type: item.title ? 'movie' : 'tv'
  }));

  results.forEach(element => {
    let genresMovie = [];
    if (element.genre_ids) {
      if (element.genre_ids.length > 0) {
        element.genre_ids.forEach(id => {
          const genre = genres.find(genre => genre.id === id);
          if (genre) genresMovie.push(genre.name);
        });
      }
    }
    element.genres = genresMovie;
  });

  if (!resMovies.ok || !resTvShows.ok) {
    throw new Error('Failed to fetch data');
  }

  return (
    <div>
      <Results results={results} />
      <Pagination currentPage={page} />
    </div>
  );
}
