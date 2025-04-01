import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMovieById } from "../../components/getMovieList";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    async function getMovie() {
      try {
        setError(false)
        setIsLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch  {
        setError(true);
      } finally{
        setIsLoading(false);
      }
    }
    getMovie();
  },[movieId])

  return (
    <div>
      {isLoading && <Loader/>}
      {error && <ErrorMessage/>}
      {movie && <MovieInfo movie = {movie} /> }
    </div>
  )
}
