import Results from '@/components/Results';

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  let results = [];
  try {
    const resMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );
    const resTv = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
    );

    const dataMovies = await resMovies.json();
    const dataTv = await resTv.json();

    results = [...dataMovies.results, ...dataTv.results].map(item => ({
      ...item,
      media_type: item.title ? 'movie' : 'tv'
    }));
  } catch (error) {
    console.error("Failed to fetch search results:", error);
  }

  return (
    <div>
      {results.length === 0 ? (
        <h1 className='text-center pt-6'>No results found</h1>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
}
