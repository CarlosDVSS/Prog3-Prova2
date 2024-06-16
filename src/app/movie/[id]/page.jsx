import Image from 'next/image';


export default async function MoviePage({ params }) {
  console.log(params)
  const mediaId = params.id;
  const apiKey = process.env.API_KEY;


  if (!mediaId) {
    console.error('Invalid ID:', mediaId);
    return <div>Invalid ID</div>;
  }

  let media;
  let isMovie = true;

  console.log('Fetching data for ID:', mediaId);

  if(mediaId != 'spinner.svg'){
    try {
      console.log(`https://api.themoviedb.org/3/movie/${mediaId}?api_key=${apiKey}&language=en-US`);
      let res = await fetch(`https://api.themoviedb.org/3/movie/${mediaId}?api_key=${apiKey}&language=en-US`);
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching movie data:', errorData);
        isMovie = false;
      }
  
      if (isMovie) {
        console.log(res);
        media = await res.json();
      } else {
        res = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}?api_key=${apiKey}&language=en-US`);
        console.log('ricardo', res);
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error fetching TV show data:', errorData);
          throw new Error('Failed to fetch TV show data');
        }
  
        media = await res.json();
      }
  
      let episodes = [];
      if (!isMovie) {
        const seasonsRes = await fetch(`https://api.themoviedb.org/3/tv/${mediaId}/season/1?api_key=${apiKey}&language=en-US`);
        if (seasonsRes.ok) {
          const seasonData = await seasonsRes.json();
          episodes = seasonData.episodes;
        }
      }
  
      return (
        <div className='w-full'>
          <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            <Image
              src={`https://image.tmdb.org/t/p/original/${media.backdrop_path || media.poster_path}`}
              width={500}
              height={300}
              className='rounded-lg'
              style={{ maxWidth: '100%', height: '100%' }}
            />
            <div className='p-2'>
              <h2 className='text-lg mb-3 font-bold'>{media.title || media.name}</h2>
              <p className='text-lg mb-3'>{media.overview}</p>
              <p className='mb-3'>
                <span className='font-semibold mr-1'>Date Released:</span>
                {media.release_date || media.first_air_date}
              </p>
              <p className='mb-3'>
                <span className='font-semibold mr-1'>Rating:</span>
                {media.vote_average}
              </p>
              {episodes.length > 0 && (
                <div>
                  <h3 className='text-lg font-bold mb-3'>Episodes</h3>
                  <ul>
                    {episodes.map((episode) => (
                      <li key={episode.id} className='mb-2'>
                        <p className='font-semibold'>{episode.name}</p>
                        <p>{episode.overview}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      );
  
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return <div>Failed to fetch data</div>;
    }
  }
}
