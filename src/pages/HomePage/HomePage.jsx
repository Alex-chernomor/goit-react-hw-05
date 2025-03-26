import { useEffect, useState } from "react";
import { fetchMovies } from "../../components/MovieList";
import { data } from "react-router-dom";
import MoviesList from "../../components/MoviesList/MoviesList";
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
          const data = await fetchMovies(url,'',1);
          setMovies(data.results)
        } catch  {
          setError(true)
        } finally {
          setIsLoading(false)
        }
      }
      getMovies(data)
    },[])


  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader/>}
      {error && <ErrorMessage/>}
      {movies.length>0 && <MoviesList movies={movies}/>}
    </div>
  )
}
