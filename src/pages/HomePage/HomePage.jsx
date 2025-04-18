import { useEffect, useState } from "react";
import { fetchTrandingMovies } from "../../components/TrendingMovies";
import MovieList from '../../components/MovieList/MovieList'
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
const url = 'https://api.themoviedb.org/3/movie/popular';

export default function HomePage() {
    const [movies, setMovies]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=>{
      async function getMovies() {
        try {
          setIsLoading(true)
          setError(false)
          const data = await fetchTrandingMovies(url, 1);
          setMovies(data.results);
        } catch  {
          setError(true)
        } finally {
          setIsLoading(false)
        }
      }
      getMovies()
    },[])


  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader/>}
      {error && <ErrorMessage/>}
      {movies.length>0 && <MovieList movies={movies}/>}
    </div>
  )
}
