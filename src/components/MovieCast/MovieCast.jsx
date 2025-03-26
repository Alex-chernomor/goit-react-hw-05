import { useEffect, useState } from "react";
import { fetchMovieCasts } from "../MovieList";
import { useParams } from "react-router-dom";
import css from './MovieCast.module.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const {movieId} = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(false);
 try {
    useEffect(()=>{
      async function getReviews() {
        setError(false);
        const data = await fetchMovieCasts(movieId);
        setCasts(data.cast);        
      }
      getReviews();
    },[movieId]);
  } catch  {
    setError(true);
  }  
  return (
    <div>
          <ul className={css.castList}>
              {casts.length>0 && casts.map((cast)=>{
                return <li key={cast.id} className={css.castEl}>
                  <img className={css.photo} src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
                  <h2>{cast.name}</h2>
                  <p>{cast.character}</p>
                </li>
              })}
              </ul>
              {error && <ErrorMessage/>}
              {casts.length === 0 && <p>No reviews</p>}
    </div>
  )
}
